# Property Management Frontend

A modern, user-friendly web application built with **Next.js**, and **TypeScript** for browsing, listing, and managing properties. This frontend provides an intuitive interface for property buyers, property owners, and administrators to interact with the property marketplace.

---

## 🎯 Overview

**Habesha Hub** is the frontend application for a comprehensive property management platform. It enables users to:
- Browse and search property listings
- Create and manage property listings (for sellers)
- Handle user authentication and account management
- Process payments for listing fees
- Access admin controls for platform management

The application is built with modern React patterns, server-side rendering via Next.js, and connects to a FastAPI backend for all data operations.

---

## ✨ Features

### For Buyers/Renters
- **Property Discovery** - Browse all active property listings
- **Advanced Filtering** - Filter by category, price range, location, listing type (sale/rent)
- **Detailed Views** - See full property details including images, description, and owner contact
- **Favorites** - Save favorite properties to local storage for quick access
- **Search** - Search properties by title, description, address

### For Property Owners
- **Property Listing** - Create new property listings with images
- **Listing Management** - View, edit, and delete your own listings
- **Payment Processing** - Initiate payments for listing fees via Chapa
- **Image Management** - Upload and manage property images
- **Seller Dashboard** - Monitor your listings and their performance

### For Administrators
- **User Management** - View and manage user accounts
- **Property Oversight** - Monitor all platform listings
- **Admin Dashboard** - Control and manage platform resources

### Core Features
- **Authentication** - Traditional login/register + Google OAuth
- **Session Management** - Secure cookie-based authentication
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Real-time UI** - Dynamic updates using React Query
- **Type Safety** - Full TypeScript support

---

## 🛠 Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Next.js 16.2.6 | Server-side rendering & routing |
| **Language** | TypeScript 5 | Type-safe development |
| **UI Library** | React 19.2.4 | Component-based UI |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **UI Components** | Radix UI | Accessible, unstyled components |
| **Forms** | React Hook Form 7.76 | Efficient form handling |
| **Validation** | Zod 4.4.3 | Schema validation |
| **HTTP Client** | Axios 1.16.0 | API requests |
| **Data Fetching** | TanStack React Query 5.100.9 | Server state management |
| **State Management** | Zustand 5.0.13 | Client state (lightweight) |
| **Icons** | Lucide React 1.14.0 | Icon library |
| **Linting** | ESLint 9 | Code quality |

---

## 📁 Project Structure

```
property-management-fe/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (providers setup)
│   │   ├── page.tsx                  # Home/landing page
│   │   ├── (auth)/                   # Auth pages (login, register, reset password)
│   │   ├── dashboard/                # Buyer dashboard
│   │   ├── seller/                   # Seller dashboard & listing management
│   │   ├── admin/                    # Admin dashboard
│   │   └── globals.css               # Global styles
│   │
│   ├── components/
│   │   ├── ui/                       # Reusable UI components (buttons, inputs, modals, etc.)
│   │   ├── property/                 # Property-related components (listing card, gallery, etc.)
│   │   ├── seller/                   # Seller-specific components (listing table, status badge, etc.)
│   │   ├── auth/                     # Auth components (login form, register form, etc.)
│   │   ├── navbar/                   # Navigation bar component
│   │   └── footer/                   # Footer component
│   │
│   ├── features/
│   │   ├── auth/                     # Auth feature
│   │   │   ├── constants/            # Routes, storage keys
│   │   │   ├── types/                # TypeScript types (auth.types.ts)
│   │   │   ├── utils/                # Helper functions (cookies, redirect logic)
│   │   │   └── hooks/                # Auth-related hooks
│   │   │
│   │   ├── property/                 # Property management feature
│   │   │   ├── api/                  # Property API calls
│   │   │   ├── types/                # Property TypeScript types
│   │   │   └── utils/                # Helper utilities
│   │   │
│   │   └── payment/                  # Payment integration (Chapa)
│   │       ├── api/                  # Payment API calls
│   │       └── types/                # Payment types
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useListings.ts            # Fetch seller listings (CRUD)
│   │   ├── useListingsColumns.tsx    # Table column configuration
│   │   ├── use-fake-submit.ts        # Mock form submission
│   │   └── ... other hooks
│   │
│   ├── lib/
│   │   ├── api.ts / api/client.ts    # Axios instance & API client
│   │   ├── queries.ts                # React Query hooks for data fetching
│   │   ├── auth-mock.ts              # Mock authentication (for development)
│   │   ├── auth-constants.ts         # Auth-related constants
│   │   ├── utils.ts                  # Utility functions (cn() for classnames)
│   │   └── api/errors.ts             # API error handling
│   │
│   ├── store/
│   │   ├── propertyStore.ts          # Zustand store (property filters, pagination)
│   │   └── favoritesStore.tsx        # Favorites state (localStorage-based)
│   │
│   ├── types/
│   │   ├── propertyTypes.ts          # Property-related types
│   │   ├── authTypes.ts              # Authentication types
│   │   └── ... other types
│   │
│   ├── providers/
│   │   ├── QueryProvider.tsx         # TanStack React Query provider
│   │   └── AuthProvider.tsx          # Authentication context provider
│   │
│   ├── middleware.ts                 # Next.js middleware (route protection)
│   └── data/                         # Mock data & fixtures
│
├── public/                           # Static assets (images, fonts, etc.)
│
├── design/                           # Design reference files (Stitch exports, screenshots)
│
├── next.config.ts                    # Next.js configuration (API rewrites, image domains)
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies & scripts
├── components.json                   # Shadcn/UI component configuration
└── .gitignore                        # Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥18.17
- **npm** or **yarn** or **pnpm**
- **Backend API** running at `http://localhost:8000` (or configured via `API_PROXY_TARGET`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ET-Zulu/property-management-fe.git
   cd property-management-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Create `.env.local` (Optional - for development)**
   ```bash
   # Backend API target (defaults to http://localhost:8000)
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open browser**
   - Navigate to `http://localhost:3000`
   - Check Swagger UI at `http://localhost:8000/docs` for backend API docs

### Build for Production

```bash
npm run build
npm start
```

### Authentication Flow

1. **Login/Register** → Backend returns `access_token` + `refresh_token`
2. **Cookie Storage** → Tokens stored in HTTP-only cookies
3. **Middleware Check** → `src/middleware.ts` protects routes
4. **Automatic Redirects** → Unauthenticated users → login page; Authenticated users → dashboard

Protected routes:
- `/seller/*` - Seller dashboard (OWNER role)
- `/admin/*` - Admin dashboard (ADMIN role)
- `/dashboard/*` - Buyer dashboard

Public routes:
- `/login`, `/register` - Auth pages
- `/` - Home/landing page
- `/properties`, `/properties/:id` - Browse listings

### State Management

**Global State** (Zustand):
```typescript
// Property filters & pagination
const { filters, page, setFilters, setPage } = usePropertyStore();
```

**Server State** (React Query):
```typescript
// Fetch properties with caching & background refetch
const { data, isLoading } = useQuery({
  queryKey: ["properties", filters],
  queryFn: () => api.get("/api/v1/properties")
});
```

### Form Handling

Uses **React Hook Form** + **Zod** for validation:

### Styling

**Tailwind CSS** with custom configuration:
- Pre-configured with UI component classes
- Responsive design utilities
- Dark mode support (if configured)

---

## 💻 Development Guide

### Adding a New Feature

1. **Create page** in `src/app/`
   ```bash
   # Example: src/app/new-feature/page.tsx
   ```

2. **Create component** in `src/components/`
   ```bash
   # Example: src/components/feature/FeatureCard.tsx
   ```

3. **Add types** in `src/types/`
   ```typescript
   // src/types/feature.types.ts
   ```

4. **Add API calls** in feature folder
   ```typescript
   // src/features/feature/api/index.ts
   ```

5. **Use React Query** for data fetching
   ```typescript
   useQuery({ queryKey: ["feature"], queryFn: () => api.get(...) })
   ```

### Debugging

- **Browser DevTools**: Check Network tab for API calls
- **React Query DevTools**: Install `@tanstack/react-query-devtools` for query inspection
- **Console**: Check browser console for errors


## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open Pull Request

---

## 📞 Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/ET-Zulu/property-management-fe/issues).
