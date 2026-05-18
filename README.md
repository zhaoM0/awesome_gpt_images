# Awesome Image Prompts

A beautiful AI art prompt gallery with glassmorphism design, featuring multi-model comparison and smooth animations.

## Features

- **Glassmorphism UI** - Beautiful frosted glass effects throughout the interface
- **Multi-Model Comparison** - See how the same prompt renders across different AI models
- **Like & Bookmark** - Save your favorite prompts
- **Submission System** - Submit your own prompts for community review
- **Admin Panel** - Review and moderate submissions
- **Smooth Animations** - Powered by Framer Motion
- **Dark Mode** - Full theme support with next-themes
- **Vercel Ready** - Optimized for Vercel deployment

## Tech Stack

- **Next.js 14** - App Router, React Server Components
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Smooth animations
- **Prisma** - Database ORM
- **NextAuth.js** - Authentication
- **Vercel Blob** - Image storage

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (use [Neon](https://neon.tech) for easy setup)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and fill in your values:
```env
DATABASE_URL="postgresql://..."
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
NEXTAUTH_SECRET="your-secret-key"
```

3. Set up the database:
```bash
npm run db:push
npm run db:seed
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── (main)/          # Main app layout
├── prompt/[id]/     # Prompt detail page
├── submit/          # Submit new prompt
├── admin/           # Admin review panel
└── api/             # API routes

components/
├── ui/              # shadcn components
├── glass-card.tsx   # Glass effect card
├── prompt-card.tsx  # Prompt card with animations
└── ...

lib/
├── prisma.ts        # Prisma client
├── vercel-blob.ts   # Image upload utilities
└── utils.ts         # Utilities
```

## Development

### Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Run production server
npm run start

# Database operations
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed sample data
```

### Adding New Components

```bash
# Add shadcn components
npx shadcn@latest add [component-name]

# Example:
npx shadcn@latest add dialog
```

## Deployment on Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Database Setup

For production, use [Neon](https://neon.tech) or similar PostgreSQL service.

### Image Storage

For image uploads, set up [Vercel Blob](https://vercel.com/docs/storage/vercel-blob).

## License

MIT
