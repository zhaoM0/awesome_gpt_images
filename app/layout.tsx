import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Awesome Image Prompts - AI Art Prompt Gallery",
  description: "Discover and share amazing AI image generation prompts across multiple models like DALL-E, Midjourney, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-teal-900/30" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl dark:bg-blue-700/40" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl dark:bg-cyan-700/40" />
            <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/20 blur-3xl dark:bg-teal-700/30" />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
