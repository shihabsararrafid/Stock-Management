import { verifyToken } from '@/lib/jwtutils'
import { NextRequest, NextResponse } from 'next/server'

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
