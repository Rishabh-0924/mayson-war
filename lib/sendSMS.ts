import twilio from "twilio"

const client = twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!)

export async function sendSMS(to: string, name: string, orderId: string, claimId: string) {
  try {
    const message = `Hi ${name}, we have received your warranty claim for Order ID: ${orderId}. Your Claim ID is ${claimId}. We'll contact you via email or phone within 48 hours.`

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE!,
      to: `+91${to}`,
    })
  } catch (err) {
    console.error("Failed to send SMS:", err)
  }
}
