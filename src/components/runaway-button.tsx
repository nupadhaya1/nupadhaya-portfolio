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

  const animateSpring = useCallback(
    (targetX: number, targetY: number) => {
      const stiffness = 0.08
      const damping = 0.65
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
        runCountRef.current += 1
        const newPos = getRandomPosition()
        animateSpring(newPos.x, newPos.y)
      }
    },
    [getRandomPosition, animateSpring]
  )

  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  const messages = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Nope!",
    "Try again!",
    "Not happening!",
    "Nice try!",
  ]

  const currentMessage =
    messages[Math.min(runCountRef.current, messages.length - 1)]

  return (
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
  )
}
