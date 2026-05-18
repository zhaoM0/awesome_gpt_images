"use client"

import Link from "next/link"
import { Sparkles, Home, PlusCircle, Shield } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("sticky top-0 z-50 w-full", className)}>
      <GlassCard variant="strong" className="mx-4 mt-4 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Sparkles className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold gradient-text">Awesome Prompts</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/" icon={<Home className="h-4 w-4" />}>
            Home
          </NavLink>
          <NavLink href="/submit" icon={<PlusCircle className="h-4 w-4" />}>
            Submit
          </NavLink>
          <NavLink href="/admin" icon={<Shield className="h-4 w-4" />}>
            Admin
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </GlassCard>
    </header>
  )
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors"
    >
      {icon}
      {children}
    </Link>
  )
}
