import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'API is running' });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
} 