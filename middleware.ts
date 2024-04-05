import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/jwtutils'
function isProjectGetUrl(path: string) {
  return /^\/api\/device\/\d\/file-upload+$/.test(path)
}
const publicUrl = [
  {
    regex: /^\/api\/device\/([^/]+)\/file-upload$/,
    method: 'GET',
  },
  {
    regex: /^\/api\/device\/([^/]+)$/,
    method: 'PATCH',
  },
  {
    regex: /^\/api\/device\/([^/]+)$/,
    method: 'GET',
    param: 'filesInclude',
    paramValue: 'false',
  },
]
export async function middleware(req: NextRequest) {
  console.log(!req.nextUrl.searchParams.get('filesInclude'))
  // if (
  //   publicUrl.some(
  //     (entry) =>
  //       entry.regex.test(req.nextUrl.pathname) &&
  //       req.method === entry.method &&
  //       (entry.param && entry.paramValue
  //         ? req.nextUrl.searchParams.get(entry.param) === entry.paramValue
  //         : true),
  //   )
  // ) {
  //   return NextResponse.next()
  if (
    req.nextUrl.pathname.startsWith('/api/auth') &&
    !['/api/auth/profile'].includes(req.nextUrl.pathname)
  ) {
    return NextResponse.next()
  } else {
    const token = req.headers.get('authorization') || req.cookies.get('session')?.value
    if (!token) return NextResponse.json({ message: 'Not authenticated.' }, { status: 401 })
    const payload = await verifyToken(token)
    // console.log(token)
    if (payload instanceof Error) {
      return NextResponse.json({ message: payload.message }, { status: 401 })
      // console.log('error occurred')
    }
    // console.log(payload)
    const { pathname } = req.nextUrl

    // if (pathname.startsWith('/api/admin')) {
    //   return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url))
    // }
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('userId', payload.id)
    requestHeaders.set('role', payload.role)
    // console.log(requestHeaders)
    // And the middleware expects a response object as a return so we need to involve that as well.
    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    })
    return response
  }
}

export const config = {
  matcher: ['/api/:path*'],
}
