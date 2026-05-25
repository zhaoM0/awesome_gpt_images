import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all prompts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'APPROVED'

    const prompts = await prisma.prompt.findMany({
      where: { status: status as any },
      include: {
        images: true,
        _count: {
          select: { likes: true, bookmarks: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(prompts)
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return NextResponse.json({ error: 'Failed to fetch prompts' }, { status: 500 })
  }
}

// POST create prompt
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, description, category, images } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const prompt = await prisma.prompt.create({
      data: {
        title,
        content,
        description,
        category,
        status: 'PENDING',
        images: {
          create: images || []
        }
      },
      include: {
        images: true
      }
    })

    return NextResponse.json(prompt, { status: 201 })
  } catch (error) {
    console.error('Error creating prompt:', error)
    return NextResponse.json({ error: 'Failed to create prompt' }, { status: 500 })
  }
}
