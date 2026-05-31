import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { userFromAccessToken } from '@/src/features/auth/utils/jwt';

// GET /api/customers - Get all customers (admin only)
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = userFromAccessToken(token);

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (user.role !== 'admin' as any) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // TODO: Fetch from database
    const mockCustomers = [
      {
        id: '1',
        name: 'Louis S. Cunningham',
        email: 'louis@example.com',
        phone: '+251 911 123456',
        type: 'buyer',
        joinedAt: new Date().toISOString(),
        totalSpent: 0,
        propertiesCount: 0
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+251 922 234567',
        type: 'seller',
        joinedAt: new Date().toISOString(),
        totalSpent: 0,
        propertiesCount: 3
      },
    ];

    return NextResponse.json(mockCustomers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}