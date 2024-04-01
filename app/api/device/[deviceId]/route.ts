import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { deviceId: string }; response: NextResponse },
) {
  try {
    const device = await prisma?.device.delete({
      where: {
        id: params.deviceId,
      },
    })
    return NextResponse.json(
      { success: true, message: 'Device Deleted', data: device },
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

export async function GET(
  request: NextRequest,
  { params }: { params: { deviceId: string }; response: NextResponse },
) {
  try {
    console.log(request.nextUrl.searchParams.get('filesInclude'))
    const device = await prisma?.device.findUnique({
      where: {
        id: params.deviceId,
      },
      select: {
        files: request.nextUrl.searchParams.get('filesInclude') === 'true' ? true : false,
        id: true,
        name: true,
        projectId: true,
        isUpdated: true,
      },
    })
    return NextResponse.json(
      { success: true, message: 'Device List', data: device },
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
export async function PATCH(
  request: NextRequest,
  { params }: { params: { deviceId: string }; response: NextResponse },
) {
  try {
    const device = await prisma?.device.update({
      where: {
        id: params.deviceId,
      },
      data: {
        isUpdated: true,
      },
    })
    return NextResponse.json(
      { success: true, message: 'Updated Device Device List', data: device },
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
