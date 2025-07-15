export const runtime = "nodejs"

import { type NextRequest, NextResponse } from "next/server"
import { getCustomerOrdersCollection, getWarrantyRecordsCollection, getClaimRecordsCollection } from "@/lib/database"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = await requireAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [ordersCollection, warrantiesCollection, claimsCollection] = await Promise.all([
      getCustomerOrdersCollection(),
      getWarrantyRecordsCollection(),
      getClaimRecordsCollection(),
    ])

    const [totalOrders, totalWarranties, totalClaims, activeWarranties] = await Promise.all([
      ordersCollection.countDocuments(),
      warrantiesCollection.countDocuments(),
      claimsCollection.countDocuments(),
      warrantiesCollection.countDocuments({ status: "Active" }),
    ])

    return NextResponse.json({
      totalOrders,
      totalWarranties,
      totalClaims,
      activeWarranties,
    })
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })

  }
}
