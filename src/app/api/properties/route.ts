import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { userFromAccessToken } from '@/src/features/auth/utils/jwt';

// GET /api/properties - Get all properties (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('sellerId');
    const status = searchParams.get('status');
    const adminStatus = searchParams.get('adminStatus');

    // Optional: Check authentication for protected data
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    let user = null;

    if (token) {
      user = userFromAccessToken(token);
    }

    // Build query filters
    const filters: any = {};
    if (sellerId) filters.sellerId = sellerId;
    if (status) filters.status = status;

    // Only admin can filter by adminStatus
    if (adminStatus && user?.role === 'admin' as any) {
      filters.adminStatus = adminStatus;
    }

    // TODO: Replace with your actual database query
    const mockProperties = [
      {
        id: '1',
        title: 'Luxury Villa in Kazanchis',
        price: 850000,
        location: 'Kazanchis, Addis Ababa',
        status: 'available',
        adminStatus: 'approved',
        sellerName: 'Tigist Haile',
        sellerId: 'seller_1',
        bedrooms: 4,
        bathrooms: 3,
        area: 350,
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Modern Apartment in Bole',
        price: 350000,
        location: 'Bole, Addis Ababa',
        status: 'available',
        adminStatus: 'pending',
        sellerName: 'Sarah Johnson',
        sellerId: 'seller_2',
        bedrooms: 2,
        bathrooms: 2,
        area: 120,
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json(mockProperties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/properties - Create new property (sellers only)
export async function POST(request: NextRequest) {
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

    const body = await request.json();

    // TODO: Save to database
    const newProperty = {
      id: Date.now().toString(),
      ...body,
      sellerId: user.userId,
      sellerName: user.email,
      adminStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}