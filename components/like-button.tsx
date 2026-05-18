"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LikeButtonProps {
  initialLiked?: boolean
  initialCount?: number
  promptId: string
}

export function LikeButton({
  initialLiked = false,
  initialCount = 0,
  promptId,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/prompts/${promptId}/like`, {
        method: liked ? "DELETE" : "POST",
      })
      if (response.ok) {
        setLiked(!liked)
        setCount((prev) => liked ? prev - 1 : prev + 1)
      }
    } catch (error) {
      console.error("Failed to toggle like:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={isLoading}
      className={cn(
        "gap-2 transition-colors",
        liked && "text-red-500 hover:text-red-600"
      )}
    >
      <motion.div
        animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all",
            liked && "fill-current"
          )}
        />
      </motion.div>
      <span>{count}</span>
    </Button>
  )
}
