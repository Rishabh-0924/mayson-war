import { NextResponse } from "next/server"
import { getWarrantyRecordsCollection } from "@/lib/database"

export async function POST(req: Request) {
  try {
    const { orderId, monthsToAdd } = await req.json()
    if (!orderId || !monthsToAdd) {
      return NextResponse.json({ error: "Order ID and monthsToAdd are required" }, { status: 400 })
    }

    const collection = await getWarrantyRecordsCollection()
    const record = await collection.findOne({ orderId })

    if (!record) {
      return NextResponse.json({ error: "Order ID not found" }, { status: 404 })
    }

    const currentExpiry = new Date(record.expiryDate)
    currentExpiry.setMonth(currentExpiry.getMonth() + parseInt(monthsToAdd))

    await collection.updateOne(
      { orderId },
      { $set: { expiryDate: currentExpiry.toISOString().split("T")[0] } }
    )

    return NextResponse.json({
      success: true,
      newExpiryDate: currentExpiry,
    })
  } catch (err) {
    console.error("Error updating warranty:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
