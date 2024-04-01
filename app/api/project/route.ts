import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { projectCreateSchema } from '../schemas'

export async function POST(request: NextRequest) {
  try {
    const res = projectCreateSchema.parse(await request.json())

    const project = await prisma?.project.create({
      data: res,
    })
    return NextResponse.json({ success: true, data: project }, { status: 200 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Could not parse data',
          issues: error.issues,
        },
        { status: 400 },
      )
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { success: false, message: 'Invalid Server Response' },
          { status: 404 },
        )
      }
    }

    return NextResponse.json({ success: false }, { status: 400 })
  }
}
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {},
    })
    return NextResponse.json({ success: true, data: projects }, { status: 200 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { success: false, message: 'Invalid Server Response' },
          { status: 404 },
        )
      }
    }

    return NextResponse.json({ success: false }, { status: 400 })
  }
}
