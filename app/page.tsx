"use client"
import { useEffect, useState } from "react"

export default function Home() {
  const [accepted, setAccepted] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const emojis = ["🌸", "🌹", "💖"]
      const random = emojis[Math.floor(Math.random() * emojis.length)]
      createEmoji(random)
    }, 300)

    return () => clearInterval(interval)
  }, [])

  const createEmoji = (emoji: string) => {
    const el = document.createElement("div")
    el.innerText = emoji
    el.style.position = "fixed"
    el.style.left = Math.random() * window.innerWidth + "px"
    el.style.top = "-60px"
    el.style.fontSize = Math.random() * 20 + 25 + "px"
    el.style.animation = "fall linear forwards"
    el.style.animationDuration = Math.random() * 4 + 4 + "s"
    el.style.pointerEvents = "none"
    document.body.appendChild(el)

    setTimeout(() => el.remove(), 8000)
  }

  const handleYes = () => {
    setAccepted(true)

    for (let i = 0; i < 60; i++) {
      setTimeout(() => createEmoji("🌹"), i * 40)
      setTimeout(() => createEmoji("💖"), i * 60)
    }
  }

  const moveButton = () => {
    const padding = 100
    const maxX = window.innerWidth - padding
    const maxY = window.innerHeight - padding

    const newX = Math.random() * maxX - window.innerWidth / 2
    const newY = Math.random() * maxY - window.innerHeight / 2

    setNoPosition({ x: newX, y: newY })
  }

  return (
    <main style={styles.main}>
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0.9;
          }
        }

        @keyframes glow {
          0% { text-shadow: 0 0 10px #ff69b4; }
          50% { text-shadow: 0 0 30px #ff1493; }
          100% { text-shadow: 0 0 10px #ff69b4; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {!accepted ? (
        <>
          <h1 style={styles.title}>🌹 Date? 🌹</h1>

          <div style={styles.buttons}>
            <button style={styles.yes} onClick={handleYes}>
              Evet 💘
            </button>

            <button
              style={{
                ...styles.no,
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`
              }}
              onMouseEnter={moveButton}
              onClick={moveButton}
            >
              Hayır 🙈
            </button>
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
    </main>
  )
}

const styles = {
  main: {
    height: "100vh",
    background: "radial-gradient(circle at center, #ffe6f0, #ffc0cb)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "cursive",
    overflow: "hidden",
    position: "relative" as const,
  },
  title: {
    fontSize: "4.5rem",
    color: "#c2185b",
    marginBottom: "40px",
    animation: "glow 2s infinite",
  },
  buttons: {
    display: "flex",
    gap: "30px",
    position: "relative" as const,
  },
  yes: {
    padding: "14px 32px",
    fontSize: "1.2rem",
    backgroundColor: "#e91e63",
    color: "white",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    transition: "0.3s",
    zIndex: 2,
  },
  no: {
    padding: "14px 32px",
    color: "black",
    fontSize: "1.2rem",
    backgroundColor: "#f5f5f5",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    position: "relative" as const,
    transition: "transform 0.2s ease",
  },
  success: {
    textAlign: "center" as const,
    animation: "fadeIn 0.8s ease-in-out",
  },
  bigYes: {
    fontSize: "3.5rem",
    color: "#ad1457",
  },
  subText: {
    fontSize: "1.4rem",
    marginTop: "15px",
  },
}
