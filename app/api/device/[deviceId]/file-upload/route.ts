import { updateType } from '@/app/api/schemas'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'
import { NextResponse, type NextRequest } from 'next/server'
import path from 'path'
import { ZodError, z } from 'zod'
// for uploading binary file
export async function POST(
  request: NextRequest,
  { params }: { params: { deviceId: string }; response: NextResponse },
) {
  try {
    // const data = fileUploadSchema.parse(await request.formData())
    const formData = await request.formData()
    // Get the file from the form data
    const file = formData.get('file')
    const uType = z
      .enum([updateType.firmware, updateType.fileSystem])
      .parse(formData.get('updateType'))
    // Check if a file is received
    if (!file) {
      // If no file is received, return a JSON response with an error and a 400 status code
      return NextResponse.json({ error: 'No files received.' }, { status: 400 })
    }
    if (!updateType) {
      return NextResponse.json({ error: 'Update Type is required.' }, { status: 400 })
    }
    // Convert the file data to a Buffer
    const buffer = Buffer.from(await (file as File).arrayBuffer())
    // Replace spaces in the file name with underscores
    const filename = nanoid(50) + path.extname((file as File).name)
    // Write the file to the specified directory (public/assets) with the modified filename
    const res = await writeFile(path.join(process.cwd(), process.env.UPLOAD_DIR + filename), buffer)
    // Update existing binaryFile entries (if necessary)
    const link = process.env.UPLOAD_URL + filename
    await prisma.binaryFile.updateMany({
      where: {
        deviceId: params.deviceId,
        NOT: { isLatest: false }, // Only update non-already-false entries
      },
      data: { isLatest: false },
    })
    const device = await prisma.binaryFile.create({
      data: {
        updateType: uType,
        fileLink: link,
        isLatest: true,
        deviceId: params.deviceId,
      },
    })
    if (device) {
      await prisma.device.update({
        where: { id: params.deviceId },
        data: { isUpdated: false },
      })
    }
    //  console.log(res)
    // Return a JSON response with a success message and a 201 status code
    return NextResponse.json({ success: true, message: 'File Uploaded', data: device, status: 201 })
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
    // console.log(error)
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
export async function GET(
  request: NextRequest,
  { params }: { params: { deviceId: string }; response: NextResponse },
) {
  try {
    const device = await prisma.binaryFile.findFirst({
      where: {
        isLatest: true,
        deviceId: params.deviceId,
      },
      select: {
        updateType: true,
        fileLink: true,
      },
    })

    return NextResponse.json({ success: true, message: 'File Loaded', data: device, status: 201 })
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
