"use client"

import { motion } from "framer-motion"
import { PromptCard, type Prompt } from "./prompt-card"

interface PromptGridProps {
  prompts: Prompt[]
  title?: string
  description?: string
}

export function PromptGrid({ prompts, title, description }: PromptGridProps) {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No prompts found</p>
        <p className="text-muted-foreground text-sm mt-2">Be the first to submit one!</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {(title || description) && (
        <div className="text-center space-y-2">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-lg">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {prompts.map((prompt, index) => (
          <PromptCard key={prompt.id} prompt={prompt} index={index} />
        ))}
      </div>
    </motion.div>
  )
}
