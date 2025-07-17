import { type NextRequest, NextResponse } from "next/server"
import { findWarrantyByOrderId, getClaimRecordsCollection, isWarrantyActive } from "@/lib/database"
import { sendSMS } from "@/lib/sendSMS"
import { sendClaimSubmissionEmail } from "@/lib/sendEmail"


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const orderId = formData.get("orderId") as string
    const problemDescription = formData.get("problemDescription") as string

    if (!orderId || !problemDescription) {
      return NextResponse.json({ error: "Order ID and problem description are required" }, { status: 400 })
    }

    // Find and verify warranty
    const warranty = await findWarrantyByOrderId(orderId)
    if (!warranty) {
      return NextResponse.json({ error: "Warranty not found" }, { status: 404 })
    }

    const active = await isWarrantyActive(warranty)
    if (!active) {
      return NextResponse.json({ error: "Warranty has expired" }, { status: 410 })
    }

    // Generate claim ID
    const claimId = `CLM${Date.now()}`

    // Create claim record
    const claimRecord = {
      claimId,
      orderId: warranty.orderId,
      customerName: warranty.customerName,
      product: warranty.product,
      problemDescription,
      submissionDate: new Date().toISOString().split("T")[0],
      status: "Under Review" as const,
      createdAt: new Date(),
    }

    const collection = await getClaimRecordsCollection()
    await collection.insertOne(claimRecord)

    if (warranty.email) {
      await sendClaimSubmissionEmail(warranty.email, warranty.customerName, claimRecord)
    }

    if (warranty.phone) {
      await sendSMS(warranty.phone, warranty.customerName, warranty.orderId, claimId)
    }

    return NextResponse.json({
      success: true,
      claimId,
      message: "Claim submitted successfully",
    })
  } catch (error) {
    console.error("Submit claim error:", error)
    return NextResponse.json({ error: "Failed to submit claim" }, { status: 500 })
  }
}
