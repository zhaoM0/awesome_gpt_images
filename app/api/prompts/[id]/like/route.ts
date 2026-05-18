import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Get user ID from session
    const userId = "user-id-placeholder" // Replace with actual user auth

    const like = await prisma.like.create({
      data: {
        userId,
        promptId: params.id,
      },
    })

    return NextResponse.json(like)
  } catch (error) {
    // If like already exists, handle gracefully
    return NextResponse.json(
      { error: "Already liked" },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Get user ID from session
    const userId = "user-id-placeholder"

    await prisma.like.deleteMany({
      where: {
        userId,
        promptId: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to unlike" },
      { status: 500 }
    )
  }
}
