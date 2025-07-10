# MAYSON Warranty Management System

A complete warranty management system built with Next.js, MongoDB, and TypeScript.

## Features

- **Admin Panel**: Upload Excel files with order data, view statistics, download reports
- **Warranty Setup**: Search and activate warranties for customers
- **Warranty Claims**: Submit claims with problem descriptions and images
- **Cross-device Sync**: All data stored in MongoDB for real-time synchronization

## Setup Instructions

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Setup MongoDB
- Create a free MongoDB Atlas account at https://cloud.mongodb.com
- Create a new cluster
- Get your connection string
- Add it to your environment variables

### 3. Environment Variables
Create a `.env.local` file:
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mayson_warranty
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
\`\`\`

### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### 5. Admin Login
- Username: `admin`
- Password: `mayson@123`

## Excel File Format

Your Excel file should have these columns:
| Order ID | Customer Name | Phone | Address | Product | Purchase Date |
|----------|---------------|-------|---------|---------|---------------|
| ORD001   | John Doe      | 123456| 123 Main St | Laptop | 2024-01-01 |

## API Endpoints

### Admin Routes
- `POST /api/admin/login` - Admin login
- `POST /api/admin/upload-orders` - Upload Excel file
- `GET /api/admin/stats` - Get statistics
- `GET /api/admin/download/warranties` - Download warranties Excel
- `GET /api/admin/download/claims` - Download claims Excel

### Warranty Routes
- `POST /api/warranty/search` - Search order by ID
- `POST /api/warranty/activate` - Activate warranty
- `POST /api/warranty/verify` - Verify warranty status
- `POST /api/warranty/claim` - Submit warranty claim

## Deployment

This app is ready to deploy on Vercel with MongoDB Atlas.
