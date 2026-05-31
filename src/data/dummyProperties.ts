import type { Customer, Order, DashboardStats } from "../types";
import type { Property } from "../types/propertyTypes";


export const properties: Property[] = [
  {
    property_id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
    owner_id: "owner-uuid-0001",
    title: "Modern Apartment in Bole",
    description: "A modern and spacious apartment located in the heart of Bole. Close to transport, supermarkets, and restaurants. High-quality finishing and ideal for families or professionals.",
    category: "RESIDENTIAL",
    listing_type: "FOR_RENT",
    price: "18000",
    address: "Bole, Addis Ababa",
    latitude: "9.0054",
    longitude: "38.7636",
    media_urls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    ],
    listing_fee_paid: true,
    is_active: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    property_id: "3fa85f64-5717-4562-b3fc-2c963f66afa2",
    owner_id: "owner-uuid-0002",
    title: "Luxury Villa in Kazanchis",
    description: "High-end luxury villa with premium finishing, large rooms, and a private garden. Perfect for families seeking comfort and exclusivity in a prime area.",
    category: "RESIDENTIAL",
    listing_type: "FOR_SALE",
    price: "4500000",
    address: "Kazanchis, Addis Ababa",
    latitude: "9.0200",
    longitude: "38.7614",
    media_urls: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    ],
    listing_fee_paid: true,
    is_active: true,
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z",
  },
  {
    property_id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
    owner_id: "owner-uuid-0003",
    title: "Affordable Apartment in CMC",
    description: "Affordable apartment ideal for small families or individuals. Provides essential amenities, good security, and easy access to transport and shopping centers.",
    category: "RESIDENTIAL",
    listing_type: "FOR_RENT",
    price: "12000",
    address: "CMC, Addis Ababa",
    latitude: "9.0500",
    longitude: "38.7800",
    media_urls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
    ],
    listing_fee_paid: false,
    is_active: true,
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-18T10:00:00Z",
  },
  {
    property_id: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
    owner_id: "owner-uuid-0004",
    title: "Modern 3-Bedroom Condo",
    description: "Contemporary condo with amazing city views, gym, and 24/7 security.",
    category: "RESIDENTIAL",
    listing_type: "FOR_SALE",
    price: "350000",
    address: "Kazanchis, Kirkos, Addis Ababa",
    latitude: "9.0170",
    longitude: "38.7610",
    media_urls: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    ],
    listing_fee_paid: true,
    is_active: true,
    created_at: "2024-01-25T10:00:00Z",
    updated_at: "2024-01-25T10:00:00Z",
  },
  {
    property_id: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
    owner_id: "owner-uuid-0005",
    title: "Commercial Space in Merkato",
    description: "Prime commercial space in the busiest market area. Great for retail business.",
    category: "COMMERCIAL",
    listing_type: "FOR_SALE",
    price: "500000",
    address: "Merkato, Lideta, Addis Ababa",
    latitude: "9.0333",
    longitude: "38.7333",
    media_urls: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    ],
    listing_fee_paid: false,
    is_active: false,
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z",
  },
];


export const propertiesResponse = {
  total: properties.length,
  skip: 0,
  limit: 10,
  data: properties,
};

// Customers (unchanged)
export const customers: Customer[] = [
  {
    id: "c1",
    name: "Louis S. Cunningham",
    email: "louis@example.com",
    phone: "+251911111111",
    type: "buyer",
    joinedAt: "2023-06-01T10:00:00Z",
    totalOrders: 3,
    totalSpent: 450000,
  },
  {
    id: "c2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+251922222222",
    type: "seller",
    joinedAt: "2023-08-15T10:00:00Z",
    totalOrders: 2,
    totalSpent: 0,
  },
  {
    id: "c3",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+251933333333",
    type: "both",
    joinedAt: "2023-10-20T10:00:00Z",
    totalOrders: 5,
    totalSpent: 320000,
  },
  {
    id: "c4",
    name: "Ruth Williams",
    email: "ruth@example.com",
    phone: "+251944444444",
    type: "buyer",
    joinedAt: "2023-11-01T10:00:00Z",
    totalOrders: 1,
    totalSpent: 85000,
  },
  {
    id: "c5",
    name: "David Tesfaye",
    email: "david@example.com",
    phone: "+251955555555",
    type: "seller",
    joinedAt: "2023-12-10T10:00:00Z",
    totalOrders: 4,
    totalSpent: 0,
  },
];

// Orders
export const orders: Order[] = [
  {
    id: "ord_001",
    propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
    propertyTitle: "Modern Apartment in Bole",
    propertyImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    customerId: "c1",
    customerName: "Louis S. Cunningham",
    customerEmail: "louis@example.com",
    amount: 18000,
    status: "completed",
    paymentStatus: "paid",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "ord_002",
    propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
    propertyTitle: "Modern 3-Bedroom Condo",
    propertyImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    customerId: "c4",
    customerName: "Ruth Williams",
    customerEmail: "ruth@example.com",
    amount: 350000,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2024-01-22T10:00:00Z",
  },
  {
    id: "ord_003",
    propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa2",
    propertyTitle: "Luxury Villa in Kazanchis",
    propertyImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    customerId: "c3",
    customerName: "Michael Chen",
    customerEmail: "michael@example.com",
    amount: 4500000,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2024-01-28T10:00:00Z",
  },
];

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalProperties: properties.length,
  totalPropertiesForRent: properties.filter((p) => p.listing_type === "FOR_RENT").length,
  totalPropertiesForSale: properties.filter((p) => p.listing_type === "FOR_SALE").length,
  totalCustomers: customers.length,
  totalOrders: orders.length,
  pendingApprovals: properties.filter((p) => !p.listing_fee_paid).length,
  totalRevenue: orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.amount, 0),
  monthlyGrowth: 12.5,
};

// Helper functions updated to use new field names
export const getActiveProperties = () => properties.filter((p) => p.is_active);
export const getInactiveProperties = () => properties.filter((p) => !p.is_active);
export const getPropertiesForRent = () => properties.filter((p) => p.listing_type === "FOR_RENT");
export const getPropertiesForSale = () => properties.filter((p) => p.listing_type === "FOR_SALE");
export const getUnpaidListings = () => properties.filter((p) => !p.listing_fee_paid);
export const getPendingPayments = () => orders.filter((o) => o.paymentStatus === "pending");
export const getCommercialProperties = () => properties.filter((p) => p.category === "COMMERCIAL");
export const getResidentialProperties = () => properties.filter((p) => p.category === "RESIDENTIAL");