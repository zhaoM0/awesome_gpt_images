"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, X, Eye, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import Link from "next/link"

interface Prompt {
  id: string
  title: string
  content: string
  description?: string
  category?: string
  status: string
  images: Array<{ id: string; url: string; model: string }>
  createdAt: string
}

export default function AdminPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL'>('PENDING')

  useEffect(() => {
    fetchPrompts()
  }, [filter])

  async function fetchPrompts() {
    setIsLoading(true)
    try {
      const status = filter === 'ALL' ? '' : filter
      const res = await fetch(`/api/prompts?status=${status}`)
      if (res.ok) {
        const data = await res.json()
        setPrompts(data)
      }
    } catch (error) {
      console.error('Failed to fetch prompts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function updateStatus(id: string, status: 'APPROVED' | 'REJECTED') {
    try {
      const res = await fetch(`/api/prompts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (res.ok) {
        setPrompts(prompts.map(p => p.id === id ? { ...p, status } : p))
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Review and moderate submitted prompts</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['PENDING', 'APPROVED', 'REJECTED', 'ALL'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-blue-500 text-white'
                : 'glass hover:bg-white/20'
            }`}
          >
            {f === 'ALL' ? 'All' : f} {f !== 'ALL' && `(${prompts.filter(p => p.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Prompts List */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : prompts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No prompts found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <GlassCard key={prompt.id} className="p-6">
              <div className="flex gap-6">
                {/* Image Preview */}
                <div className="flex-shrink-0">
                  {prompt.images[0] && (
                    <img
                      src={prompt.images[0].url}
                      alt={prompt.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{prompt.title}</h3>
                      {prompt.category && (
                        <span className="text-sm text-blue-500">{prompt.category}</span>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      prompt.status === 'APPROVED' ? 'bg-green-500/20 text-green-500' :
                      prompt.status === 'REJECTED' ? 'bg-red-500/20 text-red-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {prompt.status}
                    </span>
                  </div>

                  {prompt.description && (
                    <p className="text-sm text-muted-foreground">{prompt.description}</p>
                  )}

                  <p className="text-sm font-mono line-clamp-2 bg-black/5 dark:bg-white/5 p-2 rounded">
                    {prompt.content}
                  </p>

                  <div className="flex items-center gap-2 pt-2">
                    <Link href={`/prompt/${prompt.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>

                    {prompt.status === 'PENDING' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(prompt.id, 'APPROVED')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateStatus(prompt.id, 'REJECTED')}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
