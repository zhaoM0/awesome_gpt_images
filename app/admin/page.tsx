"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Check, X, Eye } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample pending prompts
const samplePendingPrompts = [
  {
    id: "pending-1",
    title: "Cosmic Nebula Portrait",
    content: "A mystical portrait surrounded by cosmic nebula, stars being born, ethereal glow, purple and gold colors, space art",
    description: "Cosmic themed portrait with nebula effects",
    category: "Sci-Fi",
    images: [
      { id: "p1-1", url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400", model: "DALL-E 3" },
    ],
    author: { name: "User123" },
    createdAt: "2024-01-18",
  },
  {
    id: "pending-2",
    title: "Vintage Car Interior",
    content: "1960s classic car interior, leather seats, wooden dashboard, nostalgic atmosphere, golden hour lighting, photorealistic",
    description: "Detailed vintage car interior",
    category: "Retro",
    images: [
      { id: "p2-1", url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400", model: "Midjourney" },
    ],
    author: { name: "CarLover" },
    createdAt: "2024-01-18",
  },
]

export default function AdminPage() {
  const [pendingPrompts, setPendingPrompts] = useState(samplePendingPrompts)
  const [reviewingId, setReviewingId] = useState<string | null>(null)

  const handleReview = async (id: string, status: "APPROVED" | "REJECTED") => {
    setReviewingId(id)
    try {
      // TODO: Implement actual review API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPendingPrompts((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Review error:", error)
    } finally {
      setReviewingId(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
            <Shield className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Admin Panel</span>
          </div>
          <h1 className="text-4xl font-bold">Review Submissions</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Pending Review</p>
          <p className="text-3xl font-bold gradient-text">{pendingPrompts.length}</p>
        </div>
      </motion.div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="glass p-1">
          <TabsTrigger value="pending" className="data-[state=active]:glass-strong">
            Pending ({pendingPrompts.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:glass-strong">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:glass-strong">
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingPrompts.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <p className="text-muted-foreground text-lg">No pending submissions</p>
            </GlassCard>
          ) : (
            pendingPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Preview */}
                    <div className="lg:w-48 shrink-0">
                      <div className="aspect-square rounded-xl overflow-hidden">
                        <img
                          src={prompt.images[0]?.url}
                          alt={prompt.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold">{prompt.title}</h3>
                            <Badge variant="outline">{prompt.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            by {prompt.author.name} • {prompt.createdAt}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5">
                        <p className="font-mono text-sm">{prompt.content}</p>
                      </div>

                      <p className="text-muted-foreground">{prompt.description}</p>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleReview(prompt.id, "APPROVED")}
                          disabled={reviewingId === prompt.id}
                          className="gap-2 bg-green-500 hover:bg-green-600"
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReview(prompt.id, "REJECTED")}
                          disabled={reviewingId === prompt.id}
                          className="gap-2 border-red-500/50 text-red-500 hover:bg-red-500/10"
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/prompt/${prompt.id}`, "_blank")}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <GlassCard className="p-12 text-center">
            <p className="text-muted-foreground text-lg">Approved prompts will appear here</p>
          </GlassCard>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <GlassCard className="p-12 text-center">
            <p className="text-muted-foreground text-lg">Rejected prompts will appear here</p>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
