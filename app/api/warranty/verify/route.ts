import { type NextRequest, NextResponse } from "next/server"
import { findWarrantyByOrderId, isWarrantyActive } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { orderId, phone } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Find warranty
    const warranty = await findWarrantyByOrderId(orderId)
    if (!warranty) {
      return NextResponse.json({ error: "Warranty not found" }, { status: 404 })
    }

    // Check if warranty is still active
    const active = await isWarrantyActive(warranty)
    if (!active) {
      return NextResponse.json({ error: "Warranty has expired" }, { status: 410 })
    }

    return NextResponse.json({
      warranty: {
        orderId: warranty.orderId,
        customerName: warranty.customerName,
        product: warranty.product,
        activationDate: warranty.activationDate,
        expiryDate: warranty.expiryDate,
        status: warranty.status,
        isActive: true,
        phoneUsedForSearch: phone,
      },
    })
  } catch (error) {
    console.error("Verify warranty error:", error)
    return NextResponse.json({ error: "Failed to verify warranty" }, { status: 500 })
  }
}
