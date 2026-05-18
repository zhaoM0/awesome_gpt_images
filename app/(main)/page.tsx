"use client"

import { PromptGrid } from "@/components/prompt-grid"
import { GlassCard } from "@/components/glass-card"
import { Sparkles, Search, TrendingUp, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

// Sample data - replace with database query
const samplePrompts = [
  {
    id: "1",
    title: "Cyberpunk City at Night",
    content: "A futuristic cyberpunk cityscape at night, neon lights reflecting on wet streets, flying cars, holographic billboards, dramatic perspective, cinematic lighting, highly detailed, 8K",
    description: "Create stunning cyberpunk cityscapes with this detailed prompt",
    category: "Sci-Fi",
    images: [
      { id: "1-1", url: "https://images.unsplash.com/photo-1575197886478-274d1e1d3c27?w=800", model: "DALL-E 3" },
      { id: "1-2", url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800", model: "Midjourney v6" },
      { id: "1-3", url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800", model: "Stable Diffusion XL" },
    ],
    _count: { likes: 42, bookmarks: 18 },
  },
  {
    id: "2",
    title: "Magical Forest Portal",
    content: "An enchanted forest with a glowing mystical portal, fireflies, ancient trees with bioluminescent plants, ethereal atmosphere, fantasy art, detailed textures",
    description: "Magical fantasy scenes with glowing elements",
    category: "Fantasy",
    images: [
      { id: "2-1", url: "https://images.unsplash.com/photo-1518173946687-a4c036bc2b2f?w=800", model: "DALL-E 3" },
      { id: "2-2", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", model: "Stable Diffusion" },
      { id: "2-3", url: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800", model: "Midjourney v6" },
    ],
    _count: { likes: 35, bookmarks: 12 },
  },
  {
    id: "3",
    title: "Steampunk Portrait",
    content: "Victorian era steampunk portrait, brass gears, steam pipes, goggles, intricate clockwork mechanisms, sepia tones with copper highlights, detailed facial features",
    description: "Victorian steampunk aesthetic with mechanical elements",
    category: "Steampunk",
    images: [
      { id: "3-1", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800", model: "Midjourney v6" },
      { id: "3-2", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", model: "DALL-E 3" },
    ],
    _count: { likes: 28, bookmarks: 9 },
  },
  {
    id: "4",
    title: "Abstract Liquid Art",
    content: "Colorful abstract liquid art, swirling iridescent fluids, oil and water mixture, macro photography, vibrant colors, smooth gradients, hypnotic patterns",
    description: "Mesmerizing abstract liquid compositions",
    category: "Abstract",
    images: [
      { id: "4-1", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800", model: "DALL-E 3" },
      { id: "4-2", url: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800", model: "Stable Diffusion XL" },
      { id: "4-3", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", model: "Leonardo AI" },
    ],
    _count: { likes: 51, bookmarks: 23 },
  },
  {
    id: "5",
    title: "Japanese Garden at Sunrise",
    content: "Traditional Japanese garden at sunrise, cherry blossoms falling, koi pond with lily pads, torii gate in background, misty atmosphere, golden hour lighting, serene",
    description: "Peaceful Japanese landscapes with natural beauty",
    category: "Nature",
    images: [
      { id: "5-1", url: "https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?w=800", model: "Midjourney" },
    ],
    _count: { likes: 67, bookmarks: 31 },
  },
  {
    id: "6",
    title: "Retro Synthwave Scene",
    content: "80s synthwave aesthetic, retro grid landscape, purple and pink neon sky, palm tree silhouettes, vintage computer graphics style, nostalgic VHS atmosphere",
    description: "Classic 80s retro-futuristic synthwave vibes",
    category: "Retro",
    images: [
      { id: "6-1", url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", model: "DALL-E 3" },
      { id: "6-2", url: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800", model: "Stable Diffusion" },
    ],
    _count: { likes: 44, bookmarks: 19 },
  },
]

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass"
        >
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">AI Art Prompt Gallery</span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="gradient-text">Awesome Image</span>{" "}
          <span className="text-foreground">Prompts</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover and share amazing AI image generation prompts across multiple models like DALL-E, Midjourney, and Stable Diffusion.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              className="glass-input pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          <FilterChip icon={<TrendingUp className="h-3 w-3" />} label="Trending" />
          <FilterChip icon={<Clock className="h-3 w-3" />} label="Newest" />
          <FilterChip label="Sci-Fi" />
          <FilterChip label="Fantasy" />
          <FilterChip label="Abstract" />
          <FilterChip label="Nature" />
        </div>
      </section>

      {/* Featured Prompts */}
      <section>
        <PromptGrid
          prompts={samplePrompts}
          title="Featured Prompts"
          description="Hand-picked prompts that produce stunning results"
        />
      </section>

      {/* Categories */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CategoryCard name="Sci-Fi" count={124} color="from-blue-500 to-cyan-500" />
        <CategoryCard name="Fantasy" count={98} color="from-cyan-500 to-teal-500" />
        <CategoryCard name="Abstract" count={76} color="from-teal-500 to-blue-500" />
        <CategoryCard name="Nature" count={89} color="from-blue-500 to-indigo-500" />
      </section>
    </div>
  )
}

function FilterChip({
  icon,
  label,
}: {
  icon?: React.ReactNode
  label: string
}) {
  return (
    <button className="px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
      {icon}
      {label}
    </button>
  )
}

function CategoryCard({
  name,
  count,
  color,
}: {
  name: string
  count: number
  color: string
}) {
  return (
    <GlassCard hover className="p-6 group cursor-pointer">
      <div className={`h-2 w-12 rounded-full bg-gradient-to-r ${color} mb-4`} />
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-muted-foreground">{count} prompts</p>
    </GlassCard>
  )
}
