import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { userFromAccessToken } from '@/src/features/auth/utils/jwt';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Promise
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = userFromAccessToken(token);
    if (!user || user.role !== 'admin' as any) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params; // ✅ await params
    const body = await request.json();
    const { status } = body;

    return NextResponse.json({
      id,
      status,
      updatedAt: new Date().toISOString(),
      message: 'Order updated successfully',
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}