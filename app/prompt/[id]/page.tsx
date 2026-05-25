"use client"

import { notFound } from "next/navigation"
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Bookmark, Share2, Copy, Check, X, ZoomIn, ZoomOut, Download, Loader2, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useCallback, useEffect, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { promptsData } from "@/lib/prompts-data"

export default function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [prompt, setPrompt] = useState<typeof promptsData[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFoundFlag, setNotFoundFlag] = useState(false)
  const [selectedImage, setSelectedImage] = useState<typeof promptsData[0]["images"][0] | null>(null)
  const [imageIndex, setImageIndex] = useState(0)

  const openLightbox = useCallback((index: number, images: typeof promptsData[0]["images"]) => {
    setSelectedImage(images[index])
    setImageIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
  }, [])

  const goToNext = useCallback((images: typeof promptsData[0]["images"]) => {
    const nextIndex = (imageIndex + 1) % images.length
    setSelectedImage(images[nextIndex])
    setImageIndex(nextIndex)
  }, [imageIndex])

  const goToPrev = useCallback((images: typeof promptsData[0]["images"]) => {
    const prevIndex = (imageIndex - 1 + images.length) % images.length
    setSelectedImage(images[prevIndex])
    setImageIndex(prevIndex)
  }, [imageIndex])

  const downloadImage = useCallback(async () => {
    if (!selectedImage || !prompt) return
    try {
      const response = await fetch(selectedImage.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${prompt.title}-${selectedImage.model}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }, [selectedImage, prompt])

  useEffect(() => {
    // Find the prompt by id
    const foundPrompt = promptsData.find(p => p.id === id)
    if (foundPrompt) {
      setPrompt(foundPrompt)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setNotFoundFlag(true)
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (notFoundFlag || !prompt) {
    return notFound()
  }

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
                {prompt.images.length} model{prompt.images.length > 1 ? 's' : ''}
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
          <h2 className="text-2xl font-bold">Generated Output{prompt.images.length > 1 ? `s (${prompt.images.length})` : ''}</h2>
          {prompt.images.length > 1 && <p className="text-sm text-muted-foreground">Click to enlarge</p>}
        </div>
        <div className={`grid gap-4 ${prompt.images.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-2 md:grid-cols-3'}`}>
          {prompt.images.map((image, index) => (
            <GalleryImage
              key={image.id}
              image={image}
              index={index}
              onClick={() => openLightbox(index, prompt.images)}
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
            onNext={() => goToNext(prompt.images)}
            onPrev={() => goToPrev(prompt.images)}
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
        <div className="relative aspect-[3/4] bg-black/5 dark:bg-white/5">
          <img
            src={image.url}
            alt={image.model}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-2 rounded-full bg-white/20 backdrop-blur-md">
              <ZoomIn className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white font-medium">{image.model}</p>
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
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleZoomIn = () => setZoom(p => Math.min(p + 0.25, 3))
  const handleZoomOut = () => setZoom(p => Math.max(p - 0.25, 0.5))
  const handleResetZoom = () => { setZoom(1); setPosition({ x: 0, y: 0 }) }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      setZoom(p => Math.min(p + 0.1, 3))
    } else {
      setZoom(p => Math.max(p - 0.1, 0.5))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      e.preventDefault()
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [image.url])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center overflow-hidden"
      onClick={onClose}
    >
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        {/* Image Counter */}
        {totalImages > 1 && (
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
            <p className="text-white text-sm font-medium">
              {currentIndex + 1} / {totalImages}
            </p>
          </div>
        )}

        {/* Spacer for balance */}
        <div className="w-10" />
      </div>

      {/* Navigation */}
      {totalImages > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Image Container */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
      >
        <img
          src={image.url}
          alt={image.model}
          draggable={false}
          className="max-w-full max-h-[85vh] object-contain rounded-lg select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </motion.div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-2xl bg-black/60 backdrop-blur-xl z-10">
        {/* Zoom Out */}
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          title="Zoom out"
        >
          <ZoomOut className="h-5 w-5 text-white" />
        </button>

        {/* Zoom Level */}
        <span className="text-white text-sm font-medium min-w-[3rem] text-center">
          {Math.round(zoom * 100)}%
        </span>

        {/* Zoom In */}
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="h-5 w-5 text-white" />
        </button>

        {/* Reset */}
        {zoom !== 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); handleResetZoom(); }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Reset zoom"
          >
            <RotateCw className="h-5 w-5 text-white" />
          </button>
        )}

        {/* Divider */}
        <div className="w-px h-6 bg-white/30 mx-2" />

        {/* Model Name */}
        <p className="text-white font-medium">{image.model}</p>

        {/* Download */}
        <button
          onClick={(e) => { e.stopPropagation(); onDownload(); }}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          title="Download"
        >
          <Download className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Thumbnail Indicators */}
      {totalImages > 1 && totalImages > 3 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 px-4 z-10">
          {Array.from({ length: totalImages }).map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                const diff = i - currentIndex
                if (diff < 0) {
                  for (let j = 0; j < -diff; j++) onPrev()
                } else if (diff > 0) {
                  for (let j = 0; j < diff; j++) onNext()
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
