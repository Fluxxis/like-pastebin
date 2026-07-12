import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { script } = await request.json();
    if (!script || typeof script !== 'string') {
      return NextResponse.json({ error: 'No script provided' }, { status: 400 });
    }

    const id = nanoid(10);
    const filename = `${id}.lua`;

    const blob = await put(filename, script, {
      access: 'public',
      contentType: 'text/plain',
    });

    // Прямая ссылка на файл в Blob — это и есть raw
    const rawUrl = blob.url;

    return NextResponse.json({
      id,
      raw_url: rawUrl,
      blob_url: blob.url,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save script' }, { status: 500 });
  }
}
