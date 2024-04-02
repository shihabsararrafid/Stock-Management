import { verifyToken } from '@/lib/jwtutils'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
const verifyPostSchema = z.object({
  email: z.string().optional(),
  username: z.string().optional(),
})
export async function GET(req: NextRequest, res: NextResponse) {
  const token = req.headers.get('authorization') || req.cookies.get('session')?.value
  if (!token) return NextResponse.json({ message: 'Not authenticated.' }, { status: 401 })
  try {
    const payload = await verifyToken(token)
    // console.log(token)
    if (payload instanceof Error) {
      return NextResponse.json({ message: payload.message }, { status: 401 })
      // console.log('error occurred')
    } else return NextResponse.json({ message: 'Verified User' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Invalid Server Response' }, { status: 500 })
  }
  // console.log(payload)
}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestData = await new Response(req.body).json()
    const data = verifyPostSchema.parse(requestData)

    if (data.email) {
      const user = await prisma.user.findUnique({ where: { email: data.email } })
      if (user)
        return NextResponse.json({ message: 'Unique Constraint Failed for Email' }, { status: 500 })
    } else if (data.username) {
      const user = await prisma.user.findUnique({ where: { username: data.username } })
      if (user)
        return NextResponse.json(
          { message: 'Unique Constraint Failed for Username' },
          { status: 500 },
        )
    }
    return NextResponse.json({ message: 'Successful' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Invalid Server Response' }, { status: 500 })
  }
}
