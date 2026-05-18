"use client"

import { notFound } from "next/navigation"
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Bookmark, Share2, Copy, Check, X, ZoomIn, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Sample data - replace with database query
const samplePrompt = {
  id: "1",
  title: "Cyberpunk City at Night",
  content: "A futuristic cyberpunk cityscape at night, neon lights reflecting on wet streets, flying cars, holographic billboards, dramatic perspective, cinematic lighting, highly detailed, 8K",
  description: "Create stunning cyberpunk cityscapes with this detailed prompt. Works great across multiple AI models with consistent results.",
  category: "Sci-Fi",
  createdAt: "2024-01-15",
  images: [
    {
      id: "1-1",
      url: "https://images.unsplash.com/photo-1575197886478-274d1e1d3c27?w=1200",
      model: "DALL-E 3",
      width: 1024,
      height: 1024,
    },
    {
      id: "1-2",
      url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200",
      model: "Midjourney v6",
      width: 1024,
      height: 1024,
    },
    {
      id: "1-3",
      url: "https://images.unsplash.com/photo-1515630278258-407f66498911?w=1200",
      model: "Stable Diffusion XL",
      width: 1024,
      height: 1024,
    },
    {
      id: "1-4",
      url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1200",
      model: "DALL-E 2",
      width: 1024,
      height: 1024,
    },
    {
      id: "1-5",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200",
      model: "Leonardo AI",
      width: 1024,
      height: 1024,
    },
    {
      id: "1-6",
      url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200",
      model: "Midjourney v5",
      width: 1024,
      height: 1024,
    },
  ],
  _count: { likes: 42, bookmarks: 18 },
}

export default function PromptDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // In production, fetch from database
  const prompt = samplePrompt
  if (!prompt) return notFound()

  const [selectedImage, setSelectedImage] = useState<typeof prompt.images[0] | null>(null)
  const [imageIndex, setImageIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setSelectedImage(prompt.images[index])
    setImageIndex(index)
  }, [prompt.images])

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
  }, [])

  const goToNext = useCallback(() => {
    const nextIndex = (imageIndex + 1) % prompt.images.length
    setSelectedImage(prompt.images[nextIndex])
    setImageIndex(nextIndex)
  }, [imageIndex, prompt.images])

  const goToPrev = useCallback(() => {
    const prevIndex = (imageIndex - 1 + prompt.images.length) % prompt.images.length
    setSelectedImage(prompt.images[prevIndex])
    setImageIndex(prevIndex)
  }, [imageIndex, prompt.images])

  const downloadImage = useCallback(async () => {
    if (!selectedImage) return
    try {
      const response = await fetch(selectedImage.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${prompt.title}-${selectedImage.model}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }, [selectedImage, prompt.title])

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Back Button */}
      <Link href="/">
        <Button variant="ghost" className="gap-2 glass">
          <ArrowLeft className="h-4 w-4" />
          Back to Gallery
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-bold">{prompt.title}</h1>
              <span className="px-3 py-1 text-sm font-medium bg-blue-500/20 text-blue-500 dark:text-blue-400 rounded-full">
                {prompt.category}
              </span>
              <Badge variant="outline" className="glass">
                {prompt.images.length} models
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">{prompt.description}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ActionButton icon={<Heart className="h-4 w-4" />} count={prompt._count.likes} />
            <ActionButton icon={<Bookmark className="h-4 w-4" />} count={prompt._count.bookmarks} />
            <ActionButton icon={<Share2 className="h-4 w-4" />} />
          </div>
        </div>
      </div>

      {/* Prompt Content */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Prompt</h2>
          <CopyButton text={prompt.content} />
        </div>
        <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {prompt.content}
        </p>
      </GlassCard>

      {/* Gallery Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Outputs ({prompt.images.length})</h2>
          <p className="text-sm text-muted-foreground">Click to enlarge</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {prompt.images.map((image, index) => (
            <GalleryImage
              key={image.id}
              image={image}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            currentIndex={imageIndex}
            totalImages={prompt.images.length}
            onClose={closeLightbox}
            onNext={goToNext}
            onPrev={goToPrev}
            onDownload={downloadImage}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function ActionButton({
  icon,
  count,
}: {
  icon: React.ReactNode
  count?: number
}) {
  return (
    <Button variant="outline" size="sm" className="glass gap-2">
      {icon}
      {count !== undefined && <span>{count}</span>}
    </Button>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy
        </>
      )}
    </Button>
  )
}

function GalleryImage({
  image,
  index,
  onClick,
}: {
  image: {
    url: string
    model: string
    width?: number
    height?: number
  }
  index: number
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      <GlassCard className="overflow-hidden">
        <div className="relative aspect-square">
          <img
            src={image.url}
            alt={image.model}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-2 rounded-full bg-white/20 backdrop-blur-md">
              <ZoomIn className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white font-medium">{image.model}</p>
            {image.width && image.height && (
              <p className="text-white/70 text-sm">
                {image.width} × {image.height}
              </p>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

function Lightbox({
  image,
  currentIndex,
  totalImages,
  onClose,
  onNext,
  onPrev,
  onDownload,
}: {
  image: { url: string; model: string }
  currentIndex: number
  totalImages: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onDownload: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {/* Navigation */}
      {totalImages > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Image Counter */}
      {totalImages > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
          <p className="text-white text-sm font-medium">
            {currentIndex + 1} / {totalImages}
          </p>
        </div>
      )}

      {/* Image */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-5xl max-h-[85vh] px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt={image.model}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />

        {/* Image Info Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl">
          <p className="text-white font-medium">{image.model}</p>
          <button
            onClick={onDownload}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Download"
          >
            <Download className="h-4 w-4 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Thumbnail Strip */}
      {totalImages > 3 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4">
          {Array.from({ length: totalImages }).map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); i === currentIndex ? null : (i < currentIndex ? onPrev() : onNext()) }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
