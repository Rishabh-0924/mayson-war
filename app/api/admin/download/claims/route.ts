import { type NextRequest, NextResponse } from "next/server"
import { getClaimRecordsCollection } from "@/lib/database"
import { requireAuth } from "@/lib/auth"
import * as XLSX from "xlsx"

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = requireAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const collection = await getClaimRecordsCollection()
    const claims = await collection.find({}).toArray()

    // Convert to Excel format
    const data = claims.map((claim) => ({
      "Claim ID": claim.claimId,
      "Order ID": claim.orderId,
      "Customer Name": claim.customerName,
      Product: claim.product,
      "Problem Description": claim.problemDescription,
      "Submission Date": claim.submissionDate,
      Status: claim.status,
      "Image URL": claim.imageUrl || "",
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Claims")

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=claims.xlsx",
      },
    })
  } catch (error) {
    console.error("Download claims error:", error)
    return NextResponse.json({ error: "Failed to download claims" }, { status: 500 })
  }
}
