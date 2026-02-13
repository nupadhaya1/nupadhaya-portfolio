"use client"

import { useState, type ReactNode } from "react"
import { Heart, Lock, ArrowRight } from "lucide-react"

const CORRECT_PASSWORD = "iloveyou"

export function PasswordGate({ children }: { children: ReactNode }) {
  const [password, setPassword] = useState("")
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.toLowerCase().trim() === CORRECT_PASSWORD) {
      setError(false)
      setUnlocked(true)
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      {/* Floating hearts in background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute gate-float-up"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${8 + i * 1.5}s`,
              bottom: "-30px",
            }}
          >
            <svg viewBox="0 0 24 24" fill="hsl(0, 70%, 55%)" width={14 + i * 3} height={14 + i * 3} opacity={0.15 + i * 0.03}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Password card */}
      <div
        className={`relative z-10 w-full max-w-md ${shaking ? "gate-shake" : ""}`}
      >
        <div className="bg-card border-2 border-border rounded-3xl p-8 md:p-10 shadow-xl text-center">
          {/* Lock icon with heart */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <Heart className="absolute -top-1 -right-1 w-6 h-6 text-primary fill-primary animate-pulse" />
          </div>

          <h1 className="text-3xl md:text-4xl font-display text-primary mb-2">
            This Page is Private
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Enter the secret password to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                placeholder="Enter password..."
                className={`w-full px-6 py-4 rounded-2xl border-2 text-lg text-center font-serif
                  bg-background text-foreground placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200
                  ${error ? "border-destructive" : "border-border focus:border-primary"}`}
                autoFocus
                id="vday-password-input"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive font-medium gate-fade-in">
                Hmm, that&apos;s not the right password. Try again! 💕
              </p>
            )}

            <button
              type="submit"
              id="vday-password-submit"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-serif text-lg
                hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-current" />
              Unlock
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Hint */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          Hint: think about what I feel for you 💗
        </p>
      </div>
    </div>
  )
}
