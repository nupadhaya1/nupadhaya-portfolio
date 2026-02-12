"use client"

import { useState } from "react"
import { RunawayButton } from "./runaway-button"
import { Heart } from "lucide-react"

export function QuestionSection() {
  const [saidYes, setSaidYes] = useState(false)

  if (saidYes) {
    return (
      <section className="py-20 px-4 text-center" id="question">
        <div className="max-w-2xl mx-auto">
          <div className="animate-bounce-slow">
            <Heart className="w-20 h-20 mx-auto text-primary fill-primary mb-6" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-primary mb-6">
            {"I knew you'd say yes!"}
          </h2>
          <p className="text-xl md:text-2xl text-foreground leading-relaxed">
            {"You've just made me the happiest person in the world. I can't wait to make every moment with you unforgettable."}
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className="w-8 h-8 text-primary fill-primary animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes bounce-slow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
        `}</style>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 text-center" id="question">
      <div className="max-w-2xl mx-auto">
        <Heart className="w-12 h-12 mx-auto text-primary fill-primary mb-6 animate-pulse" />
        <h2 className="text-4xl md:text-6xl font-display text-primary mb-4">
          Will You Be My Valentine?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
          {"Every love story is beautiful, but ours is my favorite. So here's the big question..."}
        </p>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setSaidYes(true)}
            className="px-10 py-4 bg-primary text-primary-foreground font-serif text-xl rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Yes!
          </button>
          <RunawayButton />
        </div>
      </div>
    </section>
  )
}
