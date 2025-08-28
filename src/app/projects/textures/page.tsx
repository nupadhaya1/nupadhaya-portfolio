"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  Eye,
  MonitorSmartphone,
  ArrowLeft,
  Sparkles,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Fixed import path for badge component
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Source of truth for your demos
const TEXTURES: Array<{
  id: string;
  name: string;
  tech: "three" | "p5";
  url: string; // path inside /public
  description?: string;
  tags: string[];
}> = [
  {
    id: "3dp",
    name: "3D Printed Texture",
    tech: "three",
    url: "/textures/3dp.html",
    description: "Layered shader stripes with adjustable density.",
    tags: ["shader", "procedural", "three.js"],
  },
  {
    id: "blk-cf",
    name: "Black Carbon Fiber",
    tech: "three",
    url: "/textures/blk_cf.html",
    description: "Real‑time carbon‑fiber weave shader with scale control.",
    tags: ["weave", "shader", "three.js"],
  },
  {
    id: "blk-cf-2",
    name: "Black Carbon Fiber 2",
    tech: "three",
    url: "/textures/blk_cf_2.html",
    description: "Carbon‑fiber with base color control & download.",
    tags: ["weave", "download", "three.js"],
  },
  {
    id: "red-cf",
    name: "Red Carbon Fiber",
    tech: "three",
    url: "/textures/red_cf.html",
    description: "Tintable carbon‑fiber variant.",
    tags: ["weave", "color", "three.js"],
  },
  {
    id: "aluminum",
    name: "Aluminum",
    tech: "p5",
    url: "/textures/aluminum.html",
    description: "Color, roughness, and normal maps via Perlin noise.",
    tags: ["PBR", "maps", "p5.js"],
  },
  {
    id: "black-steel",
    name: "Black Steel",
    tech: "p5",
    url: "/textures/blk_steel.html",
    description: "Generates color/roughness/normal maps.",
    tags: ["PBR", "maps", "p5.js"],
  },
  {
    id: "grid-concrete",
    name: "Grid Concrete",
    tech: "p5",
    url: "/textures/grid_concrete.html",
    description: "Tiled concrete with roughness/normal.",
    tags: ["tiling", "maps", "p5.js"],
  },
  {
    id: "top-grid",
    name: "Top Grid",
    tech: "p5",
    url: "/textures/top_grid.html",
    description: "Grid/plate style preview.",
    tags: ["grid", "p5.js"],
  },
  {
    id: "top-plate",
    name: "Top Plate",
    tech: "p5",
    url: "/textures/top_plate.html",
    description: "Metal plate with PBR maps.",
    tags: ["metal", "maps", "p5.js"],
  },
  {
    id: "weapon-steel",
    name: "Weapon Steel",
    tech: "p5",
    url: "/textures/weapon_steel.html",
    description: "Advanced steel with multiple noise modes.",
    tags: ["steel", "noise", "p5.js"],
  },
  {
    id: "weird-brushed-metal",
    name: "Weird Brushed Metal",
    tech: "p5",
    url: "/textures/weird_brushed_metal.html",
    description: "Brushed‑metal color/roughness/normal map generator.",
    tags: ["brushed", "maps", "p5.js"],
  },
];

export default function TexturesHubPage() {
  const [query, setQuery] = useState("");
  const [tech, setTech] = useState<"all" | "three" | "p5">("all");
  const [open, setOpen] = useState<null | (typeof TEXTURES)[number]>(null);

  const filtered = useMemo(() => {
    return TEXTURES.filter((t) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = q
        ? [t.name, t.description ?? "", ...t.tags]
            .join(" ")
            .toLowerCase()
            .includes(q)
        : true;
      const matchesTech = tech === "all" ? true : t.tech === tech;
      return matchesQuery && matchesTech;
    });
  }, [query, tech]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-purple-500/5 blur-3xl delay-1000" />
        <div className="absolute top-3/4 left-1/2 h-64 w-64 animate-pulse rounded-full bg-cyan-500/5 blur-3xl delay-2000" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="group mb-6 transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:text-white"
          >
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <header className="mb-12 text-center lg:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 px-4 py-2 text-sm text-indigo-200 ring-1 ring-indigo-400/30 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="font-medium">Procedural Texture Gallery</span>
          </div>

          <h1 className="mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-4xl font-bold tracking-tight text-balance text-transparent lg:text-6xl">
            Custom WebGL & p5.js Textures
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-pretty text-indigo-100/90">
            Explore real‑time shader demos and PBR map generators. Preview
            inline or open the full demo in a new tab.
          </p>

          <div className="mb-12 flex justify-center">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-slate-800/50 ring-1 ring-indigo-500/30 backdrop-blur-sm">
              <iframe
                width="100%"
                height="450"
                src="https://www.youtube.com/embed/_fY3n52j_bQ?si=wEp6w3l9Gk-MzcI1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="aspect-video"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-indigo-300" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search textures, tags, features…"
                className="w-full border-indigo-500/30 bg-slate-800/50 py-3 pr-4 pl-10 text-base transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            <div className="relative">
              <Filter className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-indigo-300" />
              <select
                value={tech}
                onChange={(e) =>
                  setTech(e.target.value as "three" | "p5" | "all")
                }
                className="cursor-pointer appearance-none rounded-lg border border-indigo-500/30 bg-slate-800/50 py-3 pr-8 pl-10 text-base text-slate-100 shadow-sm transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none"
                aria-label="Filter by technology"
              >
                <option value="all">All Technologies</option>
                <option value="three">Three.js Only</option>
                <option value="p5">p5.js Only</option>
              </select>
            </div>
          </div>
        </header>

        <div className="mb-8 text-center">
          <p className="text-indigo-200/80">
            Showing{" "}
            <span className="font-semibold text-indigo-200">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-indigo-200">
              {TEXTURES.length}
            </span>{" "}
            textures
          </p>
        </div>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((t) => (
            <li key={t.id} className="group">
              <Card className="relative h-full overflow-hidden border-indigo-500/20 bg-gradient-to-br from-slate-900/90 to-indigo-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-indigo-400/50 hover:shadow-2xl hover:shadow-indigo-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader className="relative z-10 pb-4">
                  <CardTitle className="mb-2 flex items-start justify-between gap-3 text-lg font-semibold">
                    <span className="leading-tight text-indigo-100">
                      {t.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`shrink-0 font-medium capitalize ${
                        t.tech === "three"
                          ? "border-cyan-400/40 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-cyan-100"
                          : "border-pink-400/40 bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-100"
                      }`}
                    >
                      {t.tech === "three" ? "Three.js" : "p5.js"}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="leading-relaxed text-indigo-200/90">
                    {t.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="relative z-10 flex flex-col gap-4 pt-0">
                  <div className="flex w-full flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-indigo-400/30 text-xs text-indigo-200 transition-all duration-200 hover:border-indigo-400/50 hover:bg-indigo-500/20"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex w-full gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setOpen(t)}
                      className="flex-1 border-0 bg-gradient-to-r from-indigo-600 to-purple-600 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-indigo-500 hover:to-purple-500"
                    >
                      <Eye className="mr-2 h-4 w-4" /> Preview
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 border-slate-600/50 bg-slate-800/50 font-medium text-slate-200 transition-all duration-200 hover:scale-105 hover:border-slate-500/50 hover:bg-slate-700/50"
                    >
                      <Link
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Open
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-500/10">
              <Search className="h-12 w-12 text-indigo-400/50" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-indigo-200">
              No textures found
            </h3>
            <p className="mx-auto max-w-md text-indigo-200/70">
              Try adjusting your search terms or filter settings to find what
              you're looking for.
            </p>
          </div>
        )}
      </section>

      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-6xl overflow-hidden border-indigo-500/30 bg-gradient-to-br from-slate-900/95 to-indigo-900/60 p-0 backdrop-blur-xl">
          <DialogHeader className="px-8 pt-8 pb-4">
            <DialogTitle className="flex items-center gap-3 text-xl text-indigo-100">
              <div className="rounded-lg bg-indigo-500/20 p-2">
                <MonitorSmartphone className="h-5 w-5 text-indigo-300" />
              </div>
              {open?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="px-8 pb-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-800/50 ring-1 ring-indigo-500/30">
              {open && (
                <iframe
                  title={`${open.name} full preview`}
                  src={open.url}
                  className="h-full w-full"
                />
              )}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {open?.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-indigo-400/30 text-indigo-200"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
              {open && (
                <Button
                  asChild
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 font-medium transition-all duration-200 hover:scale-105 hover:from-indigo-500 hover:to-purple-500"
                >
                  <Link
                    href={open.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Open in new tab
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
