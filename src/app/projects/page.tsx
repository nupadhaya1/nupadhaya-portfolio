import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

// Sample projects data - you can replace this with your actual projects
type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  gradient: string;
  /** "_blank" to open in new tab, "_self" (or omit) to stay on the same tab */
  liveTarget?: "_blank" | "_self";
};

const projects: Project[] = [
  {
    id: 1,
    title: "E-Cinema Site",
    description:
      "A full-stack replica of a movie booking web app built with Next.js, featuring user authentication, payment processing, and admin movie management.",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel",
      "Shadcn/ui",
    ],
    githubUrl: "https://github.com/nupadhaya1/e_cinema_site",
    liveUrl: "https://e-cinema-site.vercel.app/",
    imageUrl:
      "https://x1r07x6czx.ufs.sh/f/9nDBrhbvVG6T5rjwHHLqpAwQfRz4l0ckmU7oVZGnLxgMBiIT",
    gradient: "from-blue-500 to-cyan-500",
    // Open in a new tab for this one:
    liveTarget: "_blank",
  },
  {
    id: 2,
    title: "Custom Textures Generator",
    description:
      "A project to generate textures to be able to render a robot within blender using P5.JS and Three.JS.",
    technologies: ["HTML", "Three.Js", "P5.Js", "Blender", "Davinci Resolve"],
    githubUrl: "https://github.com/nupadhaya1/custom-textures",
    liveUrl: "/projects/textures",
    imageUrl:
      "https://x1r07x6czx.ufs.sh/f/9nDBrhbvVG6TUbXWEtQMhWv3OnugA4SYtZl6ikVaF1EHsfIG",
    gradient: "from-indigo-500 to-purple-500",
    // Stay in the same tab for this one:
    liveTarget: "_self",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Full-width container */}
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Button
            asChild
            variant="ghost"
            className="mb-6 hover:bg-white/50 dark:hover:bg-slate-800/50"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:via-slate-200 dark:to-white">
              My Projects
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
              Here are some of the projects I've worked on. Each project
              showcases different technologies and skills I've developed as a
              software engineer.
            </p>
          </div>
        </div>

        {/* Projects Grid - full width */}
        <div className="flex w-full flex-col gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden border-0 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/70"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              />

              <div className="relative flex w-full flex-col md:flex-row">
                <div className="p-6 md:w-1/2">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10 opacity-20`}
                    />
                    <img
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={`${project.title} screenshot`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:opacity-100"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 group-hover:bg-clip-text group-hover:text-transparent dark:group-hover:from-white dark:group-hover:to-slate-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-slate-100 text-xs transition-all duration-200 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-100 dark:bg-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-800"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-3 pt-4">
                    <Button
                      asChild
                      size="sm"
                      className={`flex-1 bg-gradient-to-r ${project.gradient} shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg`}
                    >
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 border-2 bg-transparent transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <Link
                        href={project.liveUrl}
                        target={project.liveTarget}
                        rel={
                          project.liveTarget === "_blank"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Project CTA */}
        <div className="mt-16 text-center">
          <Card className="mx-auto w-full max-w-md border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-xl text-transparent dark:from-white dark:to-slate-300">
                Want to see more?
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Check out my GitHub for additional projects and contributions.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-slate-800 to-slate-900 shadow-md transition-all duration-200 hover:from-slate-700 hover:to-slate-800 hover:shadow-lg"
              >
                <Link
                  href="https://github.com/nupadhaya1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View All Projects on GitHub
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
