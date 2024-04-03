import { put } from '@vercel/blob'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')
  if (request.body) {
    const blob = await put(filename ?? nanoid(20), request.body, {
      access: 'public',
    })
    return NextResponse.json(blob)
  } else return NextResponse.json({ message: 'Unsuccessful' }, { status: 400 })

  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });

  // ⚠️ The below code is for App Router Route Handlers only
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
