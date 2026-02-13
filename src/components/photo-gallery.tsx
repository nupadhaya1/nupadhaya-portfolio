import Image from "next/image"

const photos = [
  { src: "/nyc.jpeg", alt: "Dumbo NYC" },
  { src: "/nashville.jpeg", alt: "Nashville solo g7x" },
  { src: "/nye.jpeg", alt: "NYE" },
]

export function PhotoGallery() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-display text-center text-foreground mb-2">
        Some of my favorite photos together
      </h2>
      <p className="text-center text-muted-foreground mb-12 text-lg">
        Every moment with you is my favorite
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border-2 border-border shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-[4/5] relative">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[hsl(350,30%,15%,0.6)] to-transparent p-4 pt-12">
              <p className="text-[hsl(0,0%,100%)] font-display text-xl">
                {photo.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
