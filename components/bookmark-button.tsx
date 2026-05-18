"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BookmarkButtonProps {
  initialBookmarked?: boolean
  initialCount?: number
  promptId: string
}

export function BookmarkButton({
  initialBookmarked = false,
  initialCount = 0,
  promptId,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked)
  const [count, setCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleBookmark = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/prompts/${promptId}/bookmark`, {
        method: bookmarked ? "DELETE" : "POST",
      })
      if (response.ok) {
        setBookmarked(!bookmarked)
        setCount((prev) => bookmarked ? prev - 1 : prev + 1)
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBookmark}
      disabled={isLoading}
      className={cn(
        "gap-2 transition-colors",
        bookmarked && "text-blue-500 hover:text-blue-600"
      )}
    >
      <motion.div
        animate={bookmarked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Bookmark
          className={cn(
            "h-4 w-4 transition-all",
            bookmarked && "fill-current"
          )}
        />
      </motion.div>
      <span>{count}</span>
    </Button>
  )
}
