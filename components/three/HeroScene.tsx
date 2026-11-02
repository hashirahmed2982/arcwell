"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uSize;
  attribute float aSeed;
  varying float vMix;
  varying float vGlow;

  void main() {
    vec3 p = position;
    float wave = sin(p.x * 0.55 + uTime * 0.6) * 0.35 + cos(p.z * 0.7 + uTime * 0.45) * 0.3;
    p.y += wave;

    // Lift particles near the pointer (pointer mapped onto the plane).
    vec2 m = uMouse * vec2(7.0, 4.0);
    float d = distance(p.xz, vec2(m.x, -m.y));
    float bump = smoothstep(2.8, 0.0, d);
    p.y += bump * 1.1;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.6 + aSeed * 0.8 + bump * 1.5) * (8.0 / -mv.z);
    vMix = (position.x + 9.0) / 18.0;
    vGlow = bump;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vMix;
  varying float vGlow;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uColorA, uColorB, clamp(vMix, 0.0, 1.0));
    col = mix(col, vec3(1.0), vGlow * 0.5);
    gl_FragColor = vec4(col, alpha * (0.55 + vGlow * 0.45));
  }
`;

function ParticleField({ count }: { count: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));

  const { positions, seeds } = useMemo(() => {
    const side = Math.round(Math.sqrt(count));
    const positions = new Float32Array(side * side * 3);
    const seeds = new Float32Array(side * side);
    let i = 0;
    for (let x = 0; x < side; x++) {
      for (let z = 0; z < side; z++) {
        positions[i * 3] = (x / (side - 1) - 0.5) * 18 + (Math.random() - 0.5) * 0.15;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (z / (side - 1) - 0.5) * 12 + (Math.random() - 0.5) * 0.15;
        seeds[i] = Math.random();
        i++;
      }
    }
    return { positions, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uSize: { value: 3.2 },
      uColorA: { value: new THREE.Color("#3d7bff") },
      uColorB: { value: new THREE.Color("#b05cff") },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    mouse.current.lerp(target.current, Math.min(1, delta * 4));
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      material.current.uniforms.uMouse.value.copy(mouse.current);
    }
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.42 + mouse.current.y * 0.08, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.current.x * 0.15, 0.05);
    }
  });

  return (
    <group ref={group} position={[0, -1.6, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** Wireframe "UI" shapes that float above the field and tilt toward the pointer. */
function FloatingShapes() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const { pointer } = useThree();
  const shapes = useMemo(
    () => [
      // Kept to the edges and the right-hand side so they never sit behind the headline.
      { pos: [-7.4, 3.1, -3] as const, geo: <icosahedronGeometry args={[0.6, 0]} />, color: "#3d7bff" },
      { pos: [6.2, 2.6, -2.5] as const, geo: <torusGeometry args={[0.55, 0.16, 12, 40]} />, color: "#b05cff" },
      { pos: [5.6, -1.8, 0] as const, geo: <boxGeometry args={[0.8, 0.5, 0.06]} />, color: "#7b5cff" },
      { pos: [-6.2, -2.6, 0.5] as const, geo: <octahedronGeometry args={[0.4, 0]} />, color: "#7b5cff" },
    ],
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      m.position.y = shapes[i].pos[1] + Math.sin(t * 0.8 + i) * 0.25;
      m.rotation.x = t * 0.25 + i + pointer.y * 0.5;
      m.rotation.y = t * 0.3 + i + pointer.x * 0.6;
    });
  });

  return (
    <>
      {shapes.map((s, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} position={[s.pos[0], s.pos[1], s.pos[2]]}>
          {s.geo}
          <meshBasicMaterial color={s.color} wireframe transparent opacity={0.4} />
        </mesh>
      ))}
    </>
  );
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [count] = useState(() => (typeof window !== "undefined" && window.innerWidth < 768 ? 1600 : 4900));

  // Stop rendering when the hero is off-screen to save battery and main-thread time.
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.2, 8], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <ParticleField count={count} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
