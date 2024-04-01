import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { projectCreateSchema } from '../../schemas'
export async function GET(request: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const projectId = z.coerce.number().parse(params.projectId)
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        id: true,
        name: true,
        description: true,

        device: true,
      },
    })
    return NextResponse.json(
      { success: true, data: project ? project : 'No Project Found' },
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

    return NextResponse.json({ success: false }, { status: 400 })
  }
}
export async function PATCH(request: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const projectId = z.coerce.number().parse(params.projectId)
    const res = projectCreateSchema
      .extend({
        name: z.string().optional(),
      })
      .parse(await request.json())
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: res,
      select: {
        id: true,
        name: true,
        description: true,
      },
    })
    return NextResponse.json(
      { success: true, data: project ? project : 'No Project Found' },
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

    return NextResponse.json({ success: false }, { status: 400 })
  }
}
export async function DELETE(request: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const searchParams = request.nextUrl.searchParams
    const projectId = z.coerce.number().parse(params.projectId)
    console.log(searchParams.get('projectId'), params, 'id')
    const project = await prisma.project.delete({
      where: {
        id: projectId,
      },
    })
    return NextResponse.json({ success: true, data: project }, { status: 200 })
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
