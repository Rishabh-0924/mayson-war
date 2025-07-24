export const runtime = "nodejs"


import { NextResponse } from "next/server"
import { getWarrantyRecordsCollection } from "@/lib/database"

export async function GET() {
  try {
    const collection = await getWarrantyRecordsCollection()
    const orderIds = await collection.distinct("orderId")
    return NextResponse.json({ orderIds })
  } catch (error) {
    console.error("Failed to fetch order IDs:", error)
    return NextResponse.json({ error: "Failed to fetch order IDs" }, { status: 500 })
  }
}
