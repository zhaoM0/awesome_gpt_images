import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // TODO: Get user ID from session
    const userId = "user-id-placeholder"

    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        promptId: id,
      },
    })

    return NextResponse.json(bookmark)
  } catch (error) {
    return NextResponse.json(
      { error: "Already bookmarked" },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // TODO: Get user ID from session
    const userId = "user-id-placeholder"

    await prisma.bookmark.deleteMany({
      where: {
        userId,
        promptId: id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove bookmark" },
      { status: 500 }
    )
  }
}
