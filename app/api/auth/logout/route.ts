import { errorHandler } from '@/lib/errorhandler'
import { serialize } from 'cookie'
// import { error } from "console";
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const cookie = serialize('session', '' as unknown as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
      path: '/',
    })
    return NextResponse.json(
      { success: true, data: 'Log Out Successfully' },
      { status: 200, headers: { 'Set-Cookie': `${cookie}` } },
    )
  } catch (error) {
    return errorHandler(req, res, error)
  }
}
