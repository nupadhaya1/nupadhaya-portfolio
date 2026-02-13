"use client"

import { useCallback, useRef, useState, useEffect } from "react"

interface SpringState {
  x: number
  y: number
  vx: number
  vy: number
}

export function RunawayButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const springRef = useRef<SpringState>({ x: 0, y: 0, vx: 0, vy: 0 })
  const animFrameRef = useRef<number>(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isRunning, setIsRunning] = useState(false)
  const runCountRef = useRef(0)

  const getRandomPosition = useCallback(() => {
    const padding = 80
    const btnWidth = 120
    const btnHeight = 50
    const maxX = window.innerWidth - btnWidth - padding
    const maxY = window.innerHeight - btnHeight - padding
    return {
      x: padding + Math.random() * (maxX - padding),
      y: padding + Math.random() * (maxY - padding),
    }
  }, [])

  const [hearts, setHearts] = useState<{ id: string; x: number; y: number }[]>([])
  const lastHeartPos = useRef({ x: 0, y: 0 })

  const animateSpring = useCallback(
    (targetX: number, targetY: number) => {
      const stiffness = 0.07
      const damping = 0.6
      const precision = 0.5

      const animate = () => {
        const spring = springRef.current
        const dx = targetX - spring.x
        const dy = targetY - spring.y
        const ax = dx * stiffness
        const ay = dy * stiffness

        spring.vx = (spring.vx + ax) * damping
        spring.vy = (spring.vy + ay) * damping
        spring.x += spring.vx
        spring.y += spring.vy

        setPosition({ x: spring.x, y: spring.y })

        // Heart trail logic
        const distSinceLastHeart = Math.sqrt(
          (spring.x - lastHeartPos.current.x) ** 2 +
            (spring.y - lastHeartPos.current.y) ** 2
        )
        if (distSinceLastHeart > 40) {
          lastHeartPos.current = { x: spring.x, y: spring.y }
          const id = Math.random().toString(36).substr(2, 9)
          const newHeart = { id, x: spring.x + 60, y: spring.y + 25 } // Center offset approx
          setHearts((prev) => [...prev, newHeart])
          setTimeout(() => {
            setHearts((prev) => prev.filter((h) => h.id !== id))
          }, 1000)
        }

        if (
          Math.abs(dx) > precision ||
          Math.abs(dy) > precision ||
          Math.abs(spring.vx) > precision ||
          Math.abs(spring.vy) > precision
        ) {
          animFrameRef.current = requestAnimationFrame(animate)
        } else {
          spring.x = targetX
          spring.y = targetY
          setPosition({ x: targetX, y: targetY })
          setIsRunning(false)
        }
      }

      cancelAnimationFrame(animFrameRef.current)
      setIsRunning(true)
      animFrameRef.current = requestAnimationFrame(animate)
    },
    []
  )

    const messages = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Nope!",
    "Try again!",
    "Not happening!",
    "Nice try!",
    "Why not??",
    "How dare you says no?",
    "Absolutely not!",
    "In your dreams!",
    "You can't catch me!",
    "Too slow!",
    "Not today!",
    "Serious?",
    "Come on now!",
    "I'm too fast!",
    "Missed me!",
    "Gotta be faster!",
    "Nope nope nope!",
    "Still no!",
    "Never!",
    "Dream on!",
    "Catch me if you can!",
    "Whoops!",
    "Almost had it!",
    "So close!",
    "Nuh-uh!",
    "Negatory!",
    "Access denied!",
    "Wrong button!",
    "Nice attempt!",
    "Keep trying!",
    "Unbuttonable!",
    "Slippery!",
  ]

  const [currentMessage, setCurrentMessage] = useState(messages[0])

  const handleMouseApproach = useCallback(
    (e: React.MouseEvent) => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const btnCenterX = rect.left + rect.width / 2
      const btnCenterY = rect.top + rect.height / 2
      const dist = Math.sqrt(
        (e.clientX - btnCenterX) ** 2 + (e.clientY - btnCenterY) ** 2
      )
      if (dist < 120) {
        if (runCountRef.current === 0) {
          springRef.current.x = rect.left
          springRef.current.y = rect.top
        }
        runCountRef.current += 1
        const newPos = getRandomPosition()
        animateSpring(newPos.x, newPos.y)
        setCurrentMessage(messages[Math.floor(Math.random() * messages.length)])
      }
    },
    [getRandomPosition, animateSpring, messages]
  )

  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  // const currentMessage =
  //   // messages[MathMath.min(runCountRef.current, messages.length - 1)]
  //   messages[Math.floor(Math.random() * messages.length)]

  return (
    <>
      <style jsx global>{`
        @keyframes fadeOutUp {
          from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -150%) scale(0.5);
          }
        }
        .heart-trail {
          position: fixed;
          pointer-events: none;
          animation: fadeOutUp 1s ease-out forwards;
          font-size: 24px;
          z-index: 40;
        }
      `}</style>
      
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-trail"
          style={{ left: heart.x, top: heart.y }}
        >
          ❤️
        </div>
      ))}

      <button
        ref={buttonRef}
        onMouseMove={handleMouseApproach}
        className="px-8 py-3 bg-muted text-muted-foreground font-serif text-lg rounded-full border-2 border-border hover:bg-secondary transition-colors select-none cursor-pointer"
        style={
          position.x !== 0 || position.y !== 0
            ? {
                position: "fixed",
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 50,
                transition: isRunning ? "none" : undefined,
              }
            : { position: "relative" }
        }
        aria-label="No button that runs away"
      >
        {currentMessage}
      </button>
    </>
  )
}
