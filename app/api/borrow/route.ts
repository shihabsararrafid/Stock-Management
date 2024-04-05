// import { product } from './../../../node_modules/.pnpm/@prisma+client@5.11.0_prisma@5.11.0/node_moules/.prisma/client/index.d';
import { errorHandler } from '@/lib/errorhandler'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { borrowerCreateSchema } from '../schemas'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const sessionData = await new Response(req.body).json()
    console.log(sessionData)
    const data = borrowerCreateSchema.parse(sessionData)
    const product = await prisma.borrowList.create({ data })
    if (product.id) {
      await prisma.product.update({
        where: {
          id: data.productId,
        },
        data: {
          stock: {
            decrement: data.value,
          },
        },
      })
    }
    return NextResponse.json(
      { success: true, message: 'Borrower Created Successfully', product },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return errorHandler(req, res, error)
  }
}
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const groupedBorrowLists = await prisma.borrowList.findMany({
      where: {},
      select: {
        userId: true,
        user: {
          select: {
            password: false,
            id: true,
            username: true,
            image: true,
            department: true,
            role: true,
          },
        },
        product: true,
        value: true,
      },
    })
    const borrowLists: { [key: string]: any[] } = {} // Define the type of borrowLists

    const groupedByUserId = groupedBorrowLists.reduce((acc, borrowList) => {
      const userId = borrowList.user.username
      if (!acc[userId]) {
        acc[userId] = []
      }
      acc[userId].push(borrowList)
      return acc
    }, borrowLists)

    console.log(borrowLists)
    return NextResponse.json(
      { success: true, message: 'Borrower Lists', borrowLists },
      { status: 200 },
    )
  } catch (error) {
    return errorHandler(req, res, error)
  }
}
