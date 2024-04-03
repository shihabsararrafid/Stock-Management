import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { userInfoUpdateSchema } from '../../schemas'

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string }; response: NextResponse },
) {
  try {
    const user = await prisma?.user.findUnique({
      where: {
        id: params.userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        role: true,
        department: true,
      },
    })
    return NextResponse.json({ success: true, message: 'User Info', user }, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { success: false, message: 'Invalid Server Response' },
          { status: 404 },
        )
      }
    }
    console.error(error)
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string }; response: NextResponse },
) {
  try {
    const sessionData = await new Response(request.body).json()
    const data = userInfoUpdateSchema.parse(sessionData)
    const user = await prisma?.user.update({
      where: {
        id: params.userId,
      },
      data: data,
    })
    return NextResponse.json({ success: true, message: 'Updated User Info', user }, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { success: false, message: 'Invalid Server Response' },
          { status: 404 },
        )
      }
    }
    console.error(error)
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string }; response: NextResponse },
) {
  console.log(params.userId)
  try {
    const device = await prisma?.user.delete({
      where: {
        id: params.userId,
      },
    })
    return NextResponse.json(
      { success: true, message: 'User Deleted', data: device },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { success: false, message: 'Invalid Server Response' },
          { status: 404 },
        )
      }
    }
    console.error(error)
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
