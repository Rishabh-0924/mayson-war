import nodemailer from "nodemailer"

export async function sendEmail(to: string, name: string, warranty: any) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: `"Warranty Team" <${process.env.EMAIL_ID}>`,
    to,
    subject: `Warranty Activated for Order ID: ${warranty.orderId}`,
    text: `Hello ${name},

Your warranty has been successfully activated.

🔹 Product: ${warranty.product}
🔹 Model: ${warranty.model}
🔹 Order ID: ${warranty.orderId}
🔹 Activation Date: ${warranty.activationDate}
🔹 Expiry Date: ${warranty.expiryDate}

Thank you for choosing us!`,
  }

  await transporter.sendMail(mailOptions)
}
