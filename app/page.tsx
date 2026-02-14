"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Sparkles, Html } from "@react-three/drei"
import * as THREE from "three"

function FloatingHearts() {
  const group = useRef<THREE.Group>(null!)

  useFrame(({ mouse }) => {
    if (group.current) {
      group.current.rotation.x += 0.001
      group.current.rotation.y += 0.002
      group.current.position.x = (mouse.x * 2)
      group.current.position.y = (mouse.y * 2)
    }
  })

  return (
    <group ref={group}>
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          ]}
        >
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial
            color={`hsl(${Math.random() * 360}, 80%, 70%)`}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Home() {
  const [accepted, setAccepted] = useState(false)

  return (
    <main style={styles.main}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />

        <Suspense fallback={null}>
          <FloatingHearts />
          <Sparkles
            count={200}
            size={8}
            scale={[10, 10, 10]}
            speed={0.3}
            color="#ff69b4"
          />
          {/* Html içindeki UI artık Canvas içinde */}
          <Html center>
            {!accepted ? (
              <>
                <h1 style={styles.title}>🌺 Date? 🌺</h1>

                <div style={styles.buttons}>
                  <button
                    style={styles.yes}
                    onClick={() => setAccepted(true)}
                  >
                    Evet 💘
                  </button>
                  <button style={styles.no}>Hayır 🙈</button>
                </div>
              </>
            ) : (
              <div style={styles.success}>
                <h1 style={styles.bigYes}>💖 Yuppiii 💖</h1>
                <p style={styles.subText}>
                  En güzel date için hazır ol 🌹✨
                </p>
              </div>
            )}
          </Html>
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </main>
  )
}

const styles = {
  main: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#1a0b2e",
    overflow: "hidden",
    position: "relative" as const,
  },
  title: {
    fontSize: "4rem",
    color: "#ff80ab",
    textAlign: "center" as const,
    textShadow: "0 0 20px #ff4081",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    gap: "25px",
    justifyContent: "center",
  },
  yes: {
    padding: "14px 30px",
    fontSize: "1.2rem",
    background: "linear-gradient(45deg,#ff4081,#ff80ab)",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    boxShadow: "0 0 15px #ff80ab",
    transform: "translateZ(1px)",
  },
  no: {
    padding: "14px 30px",
    fontSize: "1.2rem",
    background: "#ffffff50",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "not-allowed",
    opacity: 0.7,
  },
  success: {
    textAlign: "center" as const,
    color: "#ff80ab",
    textShadow: "0 0 15px #ff4081",
  },
  bigYes: {
    fontSize: "3.5rem",
  },
  subText: {
    fontSize: "1.4rem",
    marginTop: "10px",
  },
}
