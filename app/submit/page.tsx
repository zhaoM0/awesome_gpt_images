"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Upload, X, Plus } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    category: "",
  })
  const [images, setImages] = useState<Array<{ file: File; preview: string; model: string }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImages((prev) => [
            ...prev,
            { file, preview: reader.result as string, model: "gpt-image2" },
          ])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const updateImageModel = (index: number, model: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, model } : img))
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload images to Vercel Blob
      const imageUrls: Array<{ url: string; model: string }> = []

      for (const img of images) {
        const formData = new FormData()
        formData.append('file', img.file)

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadRes.ok) {
          throw new Error('Failed to upload image')
        }

        const { url } = await uploadRes.json()
        imageUrls.push({ url, model: img.model })
      }

      // Create prompt with images
      const promptRes = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          description: formData.description,
          category: formData.category,
          images: imageUrls,
        }),
      })

      if (!promptRes.ok) {
        throw new Error('Failed to create prompt')
      }

      alert("Prompt submitted for review!")
      setFormData({ title: "", content: "", description: "", category: "" })
      setImages([])
    } catch (error) {
      console.error("Submission error:", error)
      alert("Failed to submit prompt. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const models = ["gpt-image2", "nano-banana", "midjourney", "stable-diffusion", "dall-e-3"]
  const categories = ["Portrait", "Sports", "Product", "Anime", "Artistic", "Architecture", "3D Render"]

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">Share Your Creation</span>
        </div>
        <h1 className="text-4xl font-bold gradient-text">Submit a Prompt</h1>
        <p className="text-muted-foreground">
          Share your amazing AI image prompts with the community
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                placeholder="e.g., Cyberpunk City at Night"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="glass-input"
              />
            </div>

            {/* Prompt Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Prompt *</label>
              <Textarea
                placeholder="Enter the full prompt that generates the image..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={4}
                className="glass-input min-h-[120px]"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Brief description of what this prompt creates..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="glass-input"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      formData.category === cat
                        ? "bg-blue-500 text-white"
                        : "glass hover:bg-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Generated Images *</label>

              {/* Upload Button */}
              <label className="flex items-center justify-center gap-2 p-8 rounded-2xl border-2 border-dashed border-white/20 hover:border-white/40 transition-colors cursor-pointer">
                <Upload className="h-5 w-5" />
                <span>Click to upload images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {/* Uploaded Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative aspect-square rounded-xl overflow-hidden group">
                        <img
                          src={img.preview}
                          alt={`Upload ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <select
                        value={img.model}
                        onChange={(e) => updateImageModel(index, e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg glass-input"
                      >
                        {models.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || images.length === 0}
              className="w-full h-12 text-base"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit for Review
                </>
              )}
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  )
}
