import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse, type NextRequest } from 'next/server'
export async function GET(
  request: NextRequest,
  { params }: { params: { deviceId: string }; response: NextResponse },
) {
  try {
    const files = await prisma.binaryFile.findMany({
      where: {
        deviceId: params.deviceId,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'All Files List',
      data: files,
      status: 201,
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { success: false, message: 'Invalid Server Response' },
          { status: 404 },
        )
      }
    }
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 })
    }

    return NextResponse.json({ success: false }, { status: 400 })
  }
}
