import { Header } from "@/components/header"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-6 md:py-8">
        {children}
      </main>
      <footer className="glass mt-auto py-6 text-center text-sm text-muted-foreground">
        <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
      </footer>
    </>
  )
}
