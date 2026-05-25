"use client"

import { PromptGrid } from "@/components/prompt-grid"
import { GlassCard } from "@/components/glass-card"
import { Sparkles, Search, TrendingUp, Clock, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { promptsData, categories } from "@/lib/prompts-data"
import { useState, useMemo, useEffect } from "react"
import type { PromptData } from "@/lib/prompts-data"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [prompts, setPrompts] = useState<PromptData[]>(promptsData)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch prompts from API
  useEffect(() => {
    async function fetchPrompts() {
      try {
        const res = await fetch('/api/prompts')
        if (res.ok) {
          const data = await res.json()
          // Transform API data to match PromptData format
          const transformed = data.map((p: any) => ({
            id: p.id,
            title: p.title,
            content: p.content,
            description: p.description,
            category: p.category,
            images: p.images.map((img: any) => ({
              id: img.id,
              url: img.url,
              model: img.model,
            })),
            _count: p._count || { likes: 0, bookmarks: 0 },
          }))
          setPrompts(transformed)
        }
      } catch (error) {
        console.error('Failed to fetch prompts:', error)
        // Fall back to static data
      } finally {
        setIsLoading(false)
      }
    }
    fetchPrompts()
  }, [])

  // Filter prompts based on search and category
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = searchQuery === "" ||
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !selectedCategory || prompt.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, prompts])

  // Calculate counts per category
  const categoryCounts = categories.map(cat => ({
    name: cat,
    count: prompts.filter(p => p.category === cat).length,
  }))

  // Get top 4 categories by count
  const topCategories = categoryCounts
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)

  const categoryColors: Record<string, string> = {
    "Portrait": "from-blue-500 to-cyan-500",
    "Sports": "from-cyan-500 to-teal-500",
    "Product": "from-teal-500 to-blue-500",
    "Anime": "from-blue-500 to-indigo-500",
    "Artistic": "from-purple-500 to-pink-500",
    "Architecture": "from-indigo-500 to-blue-500",
    "3D Render": "from-cyan-500 to-blue-500",
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}
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
              placeholder="Search prompts by title, content..."
              className="glass-input pl-10 h-12 text-base pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              Found {filteredPrompts.length} result{filteredPrompts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          <FilterChip
            active={selectedCategory === null}
            icon={<TrendingUp className="h-3 w-3" />}
            label="All"
            onClick={() => setSelectedCategory(null)}
          />
          {categories.map(cat => (
            <FilterChip
              key={cat}
              active={selectedCategory === cat}
              label={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            />
          ))}
        </div>
      </section>

      {/* Featured Prompts */}
      <section>
        <PromptGrid
          prompts={filteredPrompts}
          title={searchQuery || selectedCategory ? undefined : "Featured Prompts"}
          description={searchQuery || selectedCategory ? undefined : "Hand-picked prompts that produce stunning results"}
        />
        {filteredPrompts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No prompts found</p>
            <p className="text-muted-foreground text-sm mt-2">Try a different search term or category</p>
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topCategories.map(cat => (
          <CategoryCard
            key={cat.name}
            name={cat.name}
            count={cat.count}
            color={categoryColors[cat.name] || "from-blue-500 to-cyan-500"}
          />
        ))}
      </section>
    </div>
  )
}

function FilterChip({
  icon,
  label,
  active,
  onClick,
}: {
  icon?: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
        active
          ? "bg-blue-500 text-white shadow-md"
          : "glass hover:bg-white/20"
      }`}
    >
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
