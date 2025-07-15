export const runtime = "nodejs"

import { type NextRequest, NextResponse } from "next/server"
import { getCustomerOrdersCollection } from "@/lib/database"
import { parseExcelFile } from "@/lib/excel-parser"
import { requireAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = await requireAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Parse Excel file
    const buffer = Buffer.from(await file.arrayBuffer())
    const orders = parseExcelFile(buffer)

    if (orders.length === 0) {
      return NextResponse.json({ error: "No valid data found in Excel file" }, { status: 400 })
    }

    // Save to database
    const collection = await getCustomerOrdersCollection()

    // Clear existing orders and insert new ones
    await collection.deleteMany({})

    // Convert to database format
    const dbOrders = orders.map((order) => ({
      ...order,
      createdAt: new Date(),
    }))
    console.log("Orders to insert:", JSON.stringify(dbOrders, null, 2))

    const validOrders = dbOrders.filter(order =>
  order.orderId && order.customerName && order.phone && order.product
)

if (validOrders.length === 0) {
  return NextResponse.json({ error: "No valid rows to upload" }, { status: 400 })
}

const result = await collection.insertMany(validOrders)


    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${result.insertedCount} orders`,
      count: result.insertedCount,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload orders" }, { status: 500 })
  }
}
