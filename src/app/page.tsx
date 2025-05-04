import Image from "next/image";
import Link from "next/link";

// shadcn/ui imports
import { Button } from "@/components/ui/button";

import { NewspaperIcon, Github } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex h-screen w-full rounded-lg p-8 shadow-md">
        {/* right side */}
        <div className="w-1/2 rounded-lg pr-6">
          <h1 className="my-4 text-3xl font-bold">
            Hello, I'm Nikhil Upadhaya
          </h1>
          <p className="text-lg leading-relaxed">
            I'm a software engineer with a passion for building web
            applications. I love working with the latest technologies and
            frameworks to create beautiful and functional user experiences.
          </p>

          <hr className="my-4 border-t-2 border-black" />

          <div className="flex items-center justify-center gap-2">
            <Button asChild className="w-1/2">
              <Link
                href="/Nikhil Upadhaya Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NewspaperIcon className="mr-2 h-4 w-4" />
                View Resume
              </Link>
            </Button>

            <Button asChild className="w-1/2">
              <Link
                href="https://github.com/nupadhaya1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Github
              </Link>
            </Button>
          </div>
        </div>

        {/* left side */}
        <div className="relative w-1/2 overflow-hidden">
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
