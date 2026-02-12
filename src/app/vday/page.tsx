import { FloatingHearts } from "@/components/floating-hearts"
import { HeroSection } from "@/components/hero-section"
import { PhotoGallery } from "@/components/photo-gallery"
import { LoveLetter } from "@/components/love-letter"
import { QuestionSection } from "@/components/question-section"
import { PasswordGate } from "@/components/password-gate"
import { Heart } from "lucide-react"

export default function Page() {
  return (
    <PasswordGate>
      <main className="relative min-h-screen overflow-x-hidden">
        <FloatingHearts />
        <div className="relative z-10">
          <HeroSection />
          <div className="w-24 h-px bg-border mx-auto" />
          <PhotoGallery />
          <div className="w-24 h-px bg-border mx-auto" />
          <LoveLetter />
          <div className="w-24 h-px bg-border mx-auto" />
          <QuestionSection />
          <footer className="py-10 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span className="text-sm">Made with</span>
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm">just for you</span>
            </div>
          </footer>
        </div>
      </main>
    </PasswordGate>
  )
}

