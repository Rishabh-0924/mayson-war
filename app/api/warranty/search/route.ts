import { type NextRequest, NextResponse } from "next/server"
import { findOrderById, findWarrantyByOrderId } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { orderId, phone, email } = await request.json()


    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Find the order
    const order = await findOrderById(orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if warranty already exists
    const existingWarranty = await findWarrantyByOrderId(orderId)
    if (existingWarranty) {
      return NextResponse.json({
        order: {
  orderId: order.orderId,
  customerName: order.customerName,
  email: email || order.email,
  phone: phone || order.phone,
  address: order.address,
  product: order.product,
  model: order.model,
  purchaseDate: order.purchaseDate,
  orderValue: order.orderValue,
}
,
        warranty: {
  orderId: existingWarranty.orderId,
  customerName: existingWarranty.customerName,
  email: existingWarranty.email,
  phone: existingWarranty.phone,
  product: existingWarranty.product,
  activationDate: existingWarranty.activationDate,
  expiryDate: existingWarranty.expiryDate,
  status: existingWarranty.status,
},

      })
    }

    return NextResponse.json({
      order: {
        orderId: order.orderId,
        customerName: order.customerName,
        email: order.email,
        phone: order.phone,
        address: order.address,
        product: order.product,
        model: order.model,
        purchaseDate: order.purchaseDate,
        orderValue: order.orderValue,
      },
      warranty: null,
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Failed to search order" }, { status: 500 })
  }
}
