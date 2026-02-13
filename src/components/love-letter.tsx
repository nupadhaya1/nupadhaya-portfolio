import { Heart } from "lucide-react"

export function LoveLetter() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border-2 border-border rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          <Heart className="absolute top-4 right-4 w-8 h-8 text-secondary fill-secondary" />
          <Heart className="absolute bottom-4 left-4 w-6 h-6 text-secondary fill-secondary" />
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-6">
            A Little Love Letter
          </h2>
          <div className="space-y-4 text-foreground text-lg leading-relaxed">
            <p>
              {"I thought that you should know that..."}
            </p>
            <p>
              {"You are so unbelievably beautiful + hot + pretty, Your smile lights up every room, and your laugh is my favorite sound in the world."}
            </p>
            <p>
              {"You make ordinary moments extraordinary just by being in them. Every day with you feels like the best day of my life."}
            </p>
            <p className="font-display text-2xl text-primary">
              {"You are my today and all of my tomorrows."}
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-border">
            <p className="font-display text-xl text-muted-foreground">
              With all my love,
            </p>
            <p className="font-display text-2xl text-primary mt-1">
              Your Valentine
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
