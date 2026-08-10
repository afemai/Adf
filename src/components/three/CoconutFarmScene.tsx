"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ---- Stylized low-poly coconut farm (client request: an interactive 3D
// picture of where the coconuts are produced). Performance-first:
// - mounts only when scrolled into view
// - DPR capped, no shadows, flat materials
// - auto-rotate pauses for reduced-motion users
// - parent supplies a 2D poster shown until the canvas is ready

function Palm({ position, scale = 1, lean = 0 }: { position: [number, number, number]; scale?: number; lean?: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.03 + lean;
    }
  });
  return (
    <group position={position} scale={scale}>
      <group ref={group}>
        {/* trunk */}
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.14, 0.22, 3.2, 8]} />
          <meshStandardMaterial color="#8a5a33" flatShading />
        </mesh>
        {/* fronds */}
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = (i / 7) * Math.PI * 2;
          return (
            <group key={i} position={[0, 3.2, 0]} rotation={[0, angle, 0]}>
              <mesh position={[0.85, -0.35, 0]} rotation={[0, 0, -0.55]}>
                <sphereGeometry args={[0.62, 6, 5, 0, Math.PI * 2, 0, 1.1]} />
                <meshStandardMaterial color="#2e7d46" flatShading />
              </mesh>
              <mesh position={[1.15, -0.6, 0]} rotation={[0, 0, -0.7]}>
                <sphereGeometry args={[0.28, 5, 4]} />
                <meshStandardMaterial color="#1f5c34" flatShading />
              </mesh>
            </group>
          );
        })}
        {/* coconut cluster */}
        <mesh position={[0.15, 2.95, 0.15]}>
          <sphereGeometry args={[0.17, 7, 6]} />
          <meshStandardMaterial color="#6b4226" flatShading />
        </mesh>
        <mesh position={[-0.18, 2.92, -0.1]}>
          <sphereGeometry args={[0.15, 7, 6]} />
          <meshStandardMaterial color="#5d3a20" flatShading />
        </mesh>
      </group>
    </group>
  );
}

function Crate() {
  return (
    <group position={[2.6, 0, -1.4]}>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.15, 0.5, 0.85]} />
        <meshStandardMaterial color="#a9773f" flatShading />
      </mesh>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[(-0.4 + i * 0.26 + (i % 2) * 0.1) , 0.62, (i % 2 ? 0.18 : -0.18)]}>
          <sphereGeometry args={[0.14, 6, 5]} />
          <meshStandardMaterial color="#6b4226" flatShading />
        </mesh>
      ))}
    </group>
  );
}

function ProcessingBarn() {
  const door = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (door.current) door.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.35;
  });
  return (
    <group position={[-2.7, 0, -1.2]}>
      {/* barn */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.1, 1.6, 1.6]} />
        <meshStandardMaterial color="#c9a227" flatShading />
      </mesh>
      {/* roof */}
      <mesh position={[0, 1.85, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[1.65, 1.0, 4]} />
        <meshStandardMaterial color="#8a2f24" flatShading />
      </mesh>
      {/* door (slowly swings — the de-husking entrance) */}
      <mesh ref={door} position={[0, 0.55, 0.82]}>
        <boxGeometry args={[0.6, 1.1, 0.06]} />
        <meshStandardMaterial color="#5d3a20" flatShading />
      </mesh>
      {/* smoke */}
      <group position={[0.9, 2.2, 0]}>
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.22, 0]}>
            <sphereGeometry args={[0.09 + i * 0.03, 6, 5]} />
            <meshStandardMaterial color="#e8e2d4" flatShading transparent opacity={0.5 - i * 0.12} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[6, 10, 5]} intensity={1.2} color="#fff4d6" />
      <pointLight position={[-4, 3, -2]} intensity={0.6} color="#f2b705" />
      <pointLight position={[3, 2, 4]} intensity={0.4} color="#8fd0a8" />

      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <circleGeometry args={[9, 48]} />
        <meshStandardMaterial color="#2c5e3a" flatShading />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
        <ringGeometry args={[8.6, 9.6, 48]} />
        <meshStandardMaterial color="#1e4730" flatShading />
      </mesh>
      {/* golden particles = "harvest sparkle" */}
      {Array.from({ length: 26 }).map((_, i) => {
        const a = (i / 26) * Math.PI * 2;
        const r = 2.6 + (i % 5) * 1.1;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0.12, Math.sin(a) * r]} rotation={[0, a, 0]}>
            <sphereGeometry args={[0.045, 5, 4]} />
            <meshStandardMaterial color="#f2c14f" flatShading />
          </mesh>
        );
      })}

      {/* palms */}
      <Palm position={[-1.2, 0, 1.4]} scale={1.15} lean={-0.02} />
      <Palm position={[1.1, 0, 2.1]} scale={0.95} />
      <Palm position={[-2.6, 0, 1.1]} scale={0.8} lean={0.04} />
      <Palm position={[2.4, 0, 1.3]} scale={0.7} lean={-0.04} />
      <Palm position={[0.3, 0, -2.4]} scale={1.0} />
      <Palm position={[-1.3, 0, -2.1]} scale={0.6} />

      <Crate />
      <ProcessingBarn />
    </>
  );
}

export default function CoconutFarmScene({ poster }: { poster?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div ref={wrapRef} className="relative overflow-hidden rounded-[2rem] border border-navy-100 bg-navy-900 shadow-xl">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {poster ? (
              <img src={poster} alt="Coconut farm" className="h-full w-full object-cover opacity-40" />
            ) : (
              <span className="text-cream-100/60 text-sm">Loading the farm…</span>
            )}
          </div>
        )}
        {inView && (
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, 1.8]}
              camera={{ position: [6, 3.2, 6], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
              onCreated={() => setReady(true)}
              style={{ position: "absolute", inset: 0 }}
            >
              <Scene />
              <OrbitControls
                enablePan={false}
                minDistance={4}
                maxDistance={12}
                autoRotate={!reduceMotion}
                autoRotateSpeed={0.7}
                maxPolarAngle={Math.PI / 2.15}
              />
            </Canvas>
          </Suspense>
        )}
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950/85 to-transparent px-5 pb-4 pt-12">
        <p className="text-sm font-semibold text-white">
          The Afemhai Coconut Farm — interactive
        </p>
        <p className="text-xs text-cream-100/70">
          Drag to look around · pastures, palms, harvest and the processing barn
        </p>
      </div>
    </div>
  );
}