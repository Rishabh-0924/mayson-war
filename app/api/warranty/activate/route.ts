import { type NextRequest, NextResponse } from "next/server"
import { findOrderById, getWarrantyRecordsCollection } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { orderId, email, phone } = await request.json()


    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Find the order
    const order = await findOrderById(orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Create warranty record
    const activationDate = new Date()
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + 6) // 6 months from activation

    const warrantyRecord = {
      orderId: order.orderId,
      customerName: order.customerName,
      email: email || order.email,
phone: phone || order.phone,
      address: order.address,
      product: order.product,
      model: order.model,
      purchaseDate: order.purchaseDate,
      activationDate: activationDate.toISOString().split("T")[0],
      expiryDate: expiryDate.toISOString().split("T")[0],
      status: "Active" as const,
      createdAt: new Date(),
    }

    const collection = await getWarrantyRecordsCollection()
    await collection.insertOne(warrantyRecord)

    return NextResponse.json({
      success: true,
      warranty: warrantyRecord,
    })
  } catch (error) {
    console.error("Activate warranty error:", error)
    return NextResponse.json({ error: "Failed to activate warranty" }, { status: 500 })
  }
}
