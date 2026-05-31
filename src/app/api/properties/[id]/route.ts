import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { userFromAccessToken } from '@/src/features/auth/utils/jwt';

// GET /api/properties/[id] - Get single property
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // TODO: Fetch from database
    const mockProperty = {
      id,
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
      description: 'Beautiful luxury villa in the heart of Kazanchis',
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(mockProperty);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/properties/[id] - Update property
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();

    // TODO: Check if user owns the property OR is admin
    // TODO: Update in database

    return NextResponse.json({ id, ...body, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/properties/[id] - Delete property
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}