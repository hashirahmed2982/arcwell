"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { homeBase, markets } from "@/content/site";

const R = 2;
const NAVY = new THREE.Color("#0b1b33");
const BLUE = new THREE.Color("#2453e6");

function latLon(lat: number, lon: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

const dotVertex = /* glsl */ `
  uniform float uSize;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (6.0 / -mv.z);
  }
`;
const dotFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    if (length(gl_PointCoord - 0.5) > 0.5) discard;
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

/** Evenly spaced dots on a sphere (Fibonacci lattice). */
function useDots(count: number) {
  return useMemo(() => {
    const pos = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      pos.set([Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R], i * 3);
    }
    return pos;
  }, [count]);
}

const SEG = 80;

function Arc({ to, index }: { to: [number, number]; index: number }) {
  const line = useMemo(() => {
    const a = latLon(homeBase[1], homeBase[2]);
    const b = latLon(to[0], to[1]);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const lift = 1 + a.distanceTo(b) * 0.28;
    mid.setLength(R * lift);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(SEG));
    const mat = new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.9 });
    return new THREE.Line(geo, mat);
  }, [to]);

  const end = useMemo(() => latLon(to[0], to[1], R * 1.005), [to]);

  useFrame((state) => {
    // Each arc draws itself, holds, then retracts — staggered so the globe feels alive but calm.
    const t = (state.clock.elapsedTime * 0.28 + index * 0.37) % 1.8;
    const head = Math.min(1, t) * (SEG + 1);
    const tail = t > 1.3 ? Math.min(1, (t - 1.3) / 0.5) * (SEG + 1) : 0;
    line.geometry.setDrawRange(Math.floor(tail), Math.max(0, Math.floor(head - tail)));
  });

  return (
    <>
      <primitive object={line} />
      <mesh position={end}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={BLUE} />
      </mesh>
    </>
  );
}

function Globe({ dots }: { dots: number }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });
  const positions = useDots(dots);
  const home = useMemo(() => latLon(homeBase[1], homeBase[2], R * 1.005), []);
  const homeQuat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), home.clone().normalize()), [home]);

  // Face the region between the UK and Pakistan towards the viewer.
  const baseRotY = useMemo(() => {
    const p = latLon(30, 25);
    return Math.atan2(-p.x, p.z);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      const ry = baseRotY + Math.sin(t * 0.12) * 0.12 + target.current.x * 0.25;
      const rx = 0.32 + target.current.y * 0.12;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, ry, 0.03);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, rx, 0.03);
    }
    if (ring.current) {
      const s = 1 + ((t * 0.8) % 1) * 2.2;
      ring.current.scale.setScalar(s);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - ((t * 0.8) % 1));
    }
  });

  const uniforms = useMemo(() => ({ uSize: { value: 2.6 }, uColor: { value: NAVY }, uOpacity: { value: 0.28 } }), []);

  return (
    <group ref={group} rotation={[0.32, baseRotY, 0]}>
      {/* Solid white core hides the dots on the far side, so it reads as a globe */}
      <mesh>
        <sphereGeometry args={[R * 0.985, 64, 64]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <shaderMaterial vertexShader={dotVertex} fragmentShader={dotFragment} uniforms={uniforms} transparent depthWrite={false} />
      </points>
      {markets.map(([, lat, lon], i) => (
        <Arc key={i} to={[lat, lon]} index={i} />
      ))}
      <group position={home} quaternion={homeQuat}>
        <mesh>
          <circleGeometry args={[0.06, 32]} />
          <meshBasicMaterial color={BLUE} />
        </mesh>
        <mesh ref={ring}>
          <ringGeometry args={[0.06, 0.075, 48]} />
          <meshBasicMaterial color={BLUE} transparent />
        </mesh>
      </group>
    </group>
  );
}

/** Dotted globe with arcs from Karachi to the markets we serve. Turns gently toward the pointer. */
export default function HeroScene({ still = false }: { still?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dots] = useState(() => (typeof window !== "undefined" && window.innerWidth < 768 ? 2600 : 5200));

  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={still ? "demand" : visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Globe dots={dots} />
      </Canvas>
    </div>
  );
}
