import Image from "next/image";
import Link from "next/link";

// shadcn/ui imports
import { Button } from "@/components/ui/button";

import { NewspaperIcon, Github, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex h-screen w-full flex-col-reverse rounded-lg p-8 shadow-md md:flex-row">
        {/* left side */}
        <div className="w-full rounded-lg pr-6 md:w-1/2">
          <h1 className="my-4 text-3xl font-bold">
            Hello, I'm Nikhil Upadhaya
          </h1>
          <p className="text-lg leading-relaxed">
            I'm a software engineer with a passion for building web
            applications. I love working with the latest technologies and
            frameworks to create beautiful and functional user experiences.
          </p>

          <hr className="my-4 border-t-2 border-black" />

          <div className="my-4 flex items-center justify-center gap-2">
            <Button asChild className="flex-1">
              <Link
                href="/Nikhil Upadhaya Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NewspaperIcon className="mr-2 h-4 w-4" />
                View Resume
              </Link>
            </Button>

            <Button asChild className="flex-1">
              <Link
                href="https://github.com/nupadhaya1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Github
              </Link>
            </Button>

            <div className="relative flex-1">
              <Button
                asChild
                className="w-full transform text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, hsla(8, 97%, 55%, 1) 0%, hsla(36, 96%, 52%, 1) 100%)",
                }}
              >
                <Link
                  href="/projects"
                  className="flex items-center justify-center"
                >
                  Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {/* Floating animated dialog */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform animate-bounce">
                <div className="relative rounded-lg bg-slate-800 px-3 py-2 text-xs whitespace-nowrap text-white shadow-lg">
                  Click me! 🚀{/* Speech bubble arrow */}
                  <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-slate-800"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="relative w-full flex-1 overflow-hidden md:w-1/2">
          <Image
            src="/nikhil.png"
            alt="Nikhil Upadhaya"
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </main>
  );
}
