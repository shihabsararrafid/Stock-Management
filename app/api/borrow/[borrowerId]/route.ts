import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { borrowerUpdateSchema } from '../../schemas'

export async function GET(
  request: NextRequest,
  { params }: { params: { borrowerId: string }; response: NextResponse },
) {
  try {
    const borrows = await prisma?.borrowList.findMany({
      where: {
        userId: params.borrowerId,
      },
      select: {
        id: true,
        product: true,
        user: {
          select: {
            password: false,
            id: true,
            username: true,
            image: true,
            department: true,
          },
        },
        value: true,
        createdAt: true,
      },
    })
    return NextResponse.json(
      { success: true, message: 'BorrowInfo Info', data: borrows },
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
  { params }: { params: { borrowerId: string }; response: NextResponse },
) {
  try {
    const sessionData = await new Response(request.body).json()
    const data = borrowerUpdateSchema.parse(sessionData)
    const product = await prisma?.borrowList.findUnique({
      where: { id: params.borrowerId },
    })
    const device = await prisma?.borrowList.update({
      where: {
        id: params.borrowerId,
      },
      data: data,
    })
    console.log(data.value, product?.value)
    if (data.value && data.value !== product?.value) {
      console.log('here')
      const res = await prisma?.product.update({
        where: {
          id: product?.productId,
        },
        data: {
          stock: {
            increment: (product?.value || 0) - data.value,
          },
        },
      })
    }
    return NextResponse.json(
      { success: true, message: 'Updated Borrow List', data: device },
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
export async function DELETE(
  request: NextRequest,
  { params }: { params: { borrowerId: string }; response: NextResponse },
) {
  console.log(params.borrowerId)
  try {
    const device = await prisma?.borrowList.delete({
      where: {
        id: params.borrowerId,
      },
    })
    const res = await prisma?.product.update({
      where: {
        id: device.productId,
      },
      data: {
        stock: {
          increment: device.value,
        },
      },
    })
    return NextResponse.json({ success: true, message: 'BorrowList Deleted' }, { status: 200 })
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
