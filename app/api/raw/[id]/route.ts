import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const filename = `${id}.lua`;

    const { blobs } = await list({ prefix: filename, limit: 1 });
    const blob = blobs.find(b => b.pathname === filename);

    if (!blob) {
      return new NextResponse('Script not found', { status: 404 });
    }

    const response = await fetch(blob.url);
    const content = await response.text();

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
