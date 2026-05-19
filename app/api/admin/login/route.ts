import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: '密碼錯誤' }, { status: 401 });
  }

  return NextResponse.json({ token: Buffer.from(`admin:${Date.now()}`).toString('base64') });
}
