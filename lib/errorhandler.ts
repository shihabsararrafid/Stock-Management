// errorHandler.ts
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export function errorHandler(req: NextRequest, res: NextResponse, error: any) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        message: 'Could not parse data',
        issues: error.issues,
      },
      { status: 422 },
    )
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid Server Response',
        },
        { status: 404 },
      )
    }
  }
  if (error instanceof Error)
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    )
  console.error(error)
  return NextResponse.json({ success: false }, { status: 400 })
}
