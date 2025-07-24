export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { getWarrantyRecordsCollection } from "@/lib/database"
import { sendWarrantyExtensionEmail } from "@/lib/sendEmail" // Make sure you export this in sendmail.ts

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

    const newExpiry = currentExpiry.toISOString()

    await collection.updateOne(
      { orderId },
      { $set: { expiryDate: newExpiry } }
    )

    // Send email after update
    await sendWarrantyExtensionEmail(
  record.email,
  record.customerName,
  record.orderId,
  record.product,
  record.model,
  newExpiry
)


    return NextResponse.json({
      success: true,
      newExpiry,
    })
  } catch (err) {
    console.error("Error updating warranty:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
