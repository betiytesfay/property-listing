import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { userFromAccessToken } from '@/src/features/auth/utils/jwt';

// GET /api/orders - Get all orders (admin only)
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = userFromAccessToken(token);
    if (!user || user.role !== 'admin' as any) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // TODO: Fetch from database
    const mockOrders = [
      {
        id: 'ORD001',
        customerId: 'cust_1',
        customerName: 'John Doe',
        propertyId: 'prop_1',
        propertyTitle: 'Luxury Villa',
        amount: 850000,
        status: 'completed',
        paymentMethod: 'bank_transfer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'ORD002',
        customerId: 'cust_2',
        customerName: 'Jane Smith',
        propertyId: 'prop_2',
        propertyTitle: 'Modern Apartment',
        amount: 350000,
        status: 'pending',
        paymentMethod: 'credit_card',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'ORD003',
        customerId: 'cust_3',
        customerName: 'David Wilson',
        propertyId: 'prop_3',
        propertyTitle: 'Penthouse Suite',
        amount: 1200000,
        status: 'completed',
        paymentMethod: 'bank_transfer',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    return NextResponse.json(mockOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/orders/[id] - Update order status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = userFromAccessToken(token);
    if (!user || user.role !== 'admin' as any) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();
    const { status } = body;

    // TODO: Update in database

    return NextResponse.json({
      id,
      status,
      updatedAt: new Date().toISOString(),
      message: 'Order updated successfully'
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}