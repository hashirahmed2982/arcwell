"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CERAMIC = "#ece3d4";
const CLAY = "#c4683d";

/**
 * A matte ceramic arch — the "arc" in Arcwell — standing on a paper floor in soft daylight.
 * It turns gently toward the pointer; a small clay ball (the dot in the logo) rests inside it.
 */
function Arch() {
  const group = useRef<THREE.Group>(null);
  const ball = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

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
      const ry = -0.18 + target.current.x * 0.22 + Math.sin(t * 0.25) * 0.05;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, ry, 0.04);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, target.current.y * 0.04, 0.04);
    }
    if (ball.current) {
      ball.current.position.x = 1.45 + Math.sin(t * 0.6) * 0.15;
      ball.current.rotation.z = -Math.sin(t * 0.6) * 0.5;
    }
  });

  const material = <meshStandardMaterial color={CERAMIC} roughness={0.82} metalness={0} />;

  return (
    <group ref={group} position={[-0.25, -0.1, 0]}>
      {/* Curved top of the arch */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <torusGeometry args={[2, 0.42, 48, 160, Math.PI]} />
        {material}
      </mesh>
      {/* Pillars */}
      {[-2, 2].map((x) => (
        <mesh key={x} castShadow receiveShadow position={[x, -1.3, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 2.6, 48]} />
          {material}
        </mesh>
      ))}
      {/* Plinths */}
      {[-2, 2].map((x) => (
        <mesh key={`p${x}`} castShadow receiveShadow position={[x, -2.52, 0]}>
          <boxGeometry args={[1.15, 0.16, 1.15]} />
          {material}
        </mesh>
      ))}
      <mesh ref={ball} castShadow position={[1.45, -2.3, 0.9]}>
        <sphereGeometry args={[0.22, 48, 48]} />
        <meshStandardMaterial color={CLAY} roughness={0.6} />
      </mesh>
      {/* Paper floor that only shows shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial opacity={0.14} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ still = false }: { still?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering when the hero is off-screen.
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        shadows
        frameloop={still ? "demand" : visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 12.6], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
      >
        <hemisphereLight args={["#fff8ee", "#d9cbb5", 1.6]} />
        <directionalLight
          position={[-2.5, 10, 3.5]}
          intensity={2.2}
          color="#fff3e2"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-radius={8}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[6, 2, 4]} intensity={0.6} color="#e9ecff" />
        <Arch />
      </Canvas>
    </div>
  );
}
