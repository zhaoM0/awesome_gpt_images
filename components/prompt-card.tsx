"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, Bookmark, Eye, Layers } from "lucide-react"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import { useState } from "react"

export interface Prompt {
  id: string
  title: string
  content: string
  description?: string | null
  category?: string | null
  images: Array<{
    id: string
    url: string
    model: string
  }>
  _count?: {
    likes: number
    bookmarks: number
  }
  isLiked?: boolean
  isBookmarked?: boolean
}

interface PromptCardProps {
  prompt: Prompt
  index?: number
}

export function PromptCard({ prompt, index = 0 }: PromptCardProps) {
  const [hoveredImage, setHoveredImage] = useState(0)
  const images = prompt.images
  const coverImage = images[0]
  const hasMultiple = images.length > 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link href={`/prompt/${prompt.id}`}>
        <GlassCard variant="card" hover className="h-full overflow-hidden group">
          {/* Image Preview */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl bg-black/5 dark:bg-white/5">
            {coverImage ? (
              <>
                {/* Main Image */}
                <motion.img
                  key={hoveredImage}
                  src={images[hoveredImage].url}
                  alt={prompt.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />

                {/* Image Hover Dots */}
                {hasMultiple && (
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {images.slice(0, 4).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-200",
                          i === hoveredImage
                            ? "bg-white scale-125"
                            : "bg-white/50"
                        )}
                      />
                    ))}
                  </div>
                )}

                {/* Hover Overlay with Image Navigation */}
                {hasMultiple && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                      {images.slice(0, 4).map((img, i) => (
                        <div
                          key={img.id}
                          onMouseEnter={() => setHoveredImage(i)}
                          className={cn(
                            "relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                            i === hoveredImage
                              ? "border-blue-500 scale-110"
                              : "border-white/30 hover:border-white/50"
                          )}
                        >
                          <img
                            src={img.url}
                            alt={img.model}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {images.length > 4 && (
                        <div className="w-12 h-12 rounded-lg bg-black/50 backdrop-blur-md flex items-center justify-center">
                          <span className="text-white text-xs font-medium">+{images.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Model Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {images[hoveredImage].model}
                </div>
              </>
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                <Sparkles className="h-12 w-12 text-blue-500/50" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title & Category */}
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-500 transition-colors">
                  {prompt.title}
                </h3>
                {prompt.category && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-500 dark:text-blue-400 rounded-full shrink-0">
                    {prompt.category}
                  </span>
                )}
              </div>
              {prompt.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {prompt.description}
                </p>
              )}
            </div>

            {/* Prompt Preview */}
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-white/10">
              <p className="text-sm line-clamp-2 font-mono">
                {prompt.content}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {prompt._count?.likes ?? 0}
                </span>
                <span className="flex items-center gap-1">
                  <Bookmark className="h-4 w-4" />
                  {prompt._count?.bookmarks ?? 0}
                </span>
              </div>
              <span className={cn(
                "flex items-center gap-1",
                hasMultiple && "text-blue-500"
              )}>
                {hasMultiple ? (
                  <>
                    <Layers className="h-4 w-4" />
                    {prompt.images.length}
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    {prompt.images.length}
                  </>
                )}
              </span>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}
