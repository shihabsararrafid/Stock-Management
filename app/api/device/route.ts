import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { deviceCreateSchema } from '../schemas'

export async function POST(request: NextRequest) {
  try {
    // console.log(await request.body, 'body')
    const res = deviceCreateSchema.parse(await request.json())
    res.id = nanoid(6)
    const device = await prisma?.device.create({
      data: res,
    })
    return NextResponse.json({ success: true, data: device }, { status: 200 })
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
    console.error(error)
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
