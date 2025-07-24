import nodemailer from "nodemailer"

export async function sendWarrantyActivationEmail(to: string, name: string, warranty: any) {
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

export async function sendClaimSubmissionEmail(to: string, name: string, claim: any) {
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
    subject: `Warranty Claim Received for Order ID: ${claim.orderId}`,
    text: `Hello ${name},

We have received your warranty claim.

🔹 Order ID: ${claim.orderId}
🔹 Claim ID: ${claim.claimId}
🔹 Problem: ${claim.problemDescription}
🔹 Submission Date: ${claim.submissionDate}

Our team will reach out to you via email or phone within the next 48 hours.

Thank you!`,
  }

  await transporter.sendMail(mailOptions)
}


export async function sendWarrantyExtensionEmail(
  to: string,
  name: string,
  orderId: string,
  product: string,
  model: string,
  newExpiryDate: string
) {
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
    subject: `Warranty Extended for Order ID: ${orderId}`,
    text: `Hello ${name},

Good news! Your warranty has been extended.

🔹 Product: ${product}
🔹 Model: ${model}
🔹 Order ID: ${orderId}
🔹 New Expiry Date: ${newExpiryDate}

Thank you for staying with us!`,
  }

  await transporter.sendMail(mailOptions)
}
