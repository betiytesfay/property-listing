import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { userFromAccessToken } from '@/src/features/auth/utils/jwt';

// GET /api/admin/stats - Get dashboard statistics (admin only)
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = userFromAccessToken(token);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // TODO: Aggregate from database
    const stats = {
      totalProperties: 24,
      availableProperties: 12,
      soldProperties: 8,
      rentedProperties: 4,
      totalCustomers: 156,
      totalOrders: 89,
      pendingApprovals: 3,
      totalRevenue: 12500000,
      revenueChange: '+23%',
      propertiesChange: '+12%',
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}