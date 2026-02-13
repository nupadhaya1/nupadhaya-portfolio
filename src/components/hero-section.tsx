import { Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center max-w-3xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-serif">
            A Special Question
          </span>
          <Heart className="w-6 h-6 text-primary fill-primary" />
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-primary mb-6 text-balance leading-tight">
          Hi Ish!
        </h1>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed max-w-xl mx-auto">
          {/* {"I made this just for you, because you deserve something as special as you are. Scroll down for a very important question."} */}
          {"I made this for you, because you deserve the world! Scroll down for a very important question..."}
        </p>
        <div className="mt-6">
          <a
            href="#question"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-serif text-lg hover:scale-105 transition-transform duration-300"
          >
            <Heart className="w-5 h-5 fill-current" />
            See the question
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 animate-bounce">
        <svg
          className="w-6 h-6 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      
    </section>
  )
}
