export const runtime = "nodejs"

import { type NextRequest, NextResponse } from "next/server"
import { getWarrantyRecordsCollection } from "@/lib/database"
import { requireAuth } from "@/lib/auth"
import * as XLSX from "xlsx"

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = requireAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const collection = await getWarrantyRecordsCollection()
    const warranties = await collection.find({}).toArray()

    // Convert to Excel format
    const data = warranties.map((warranty) => ({
      "Order ID": warranty.orderId,
      "Customer Name": warranty.customerName,
      Email: warranty.email,
      Phone: warranty.phone,
      Address: warranty.address,
      Product: warranty.product,
      Model: warranty.model,
      "Purchase Date": warranty.purchaseDate,
      "Activation Date": warranty.activationDate,
      "Expiry Date": warranty.expiryDate,
      Status: warranty.status,
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Warranties")

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=warranties.xlsx",
      },
    })
  } catch (error) {
    console.error("Download warranties error:", error)
    return NextResponse.json({ error: "Failed to download warranties" }, { status: 500 })
  }
}
