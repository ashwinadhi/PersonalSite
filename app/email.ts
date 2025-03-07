"use server"

import nodemailer from "nodemailer"

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Gmail pathaune email
    pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password (not your regular password)
  },
})

// Email template for contact form submissions
const createEmailTemplate = (name: string, email: string, message: string) => {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
    <hr />
    <p>This message was sent from your portfolio contact form.</p>
  `
}

// Server action to send email
export async function sendContactEmail(name: string, email: string, message: string) {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: createEmailTemplate(name, email, message),
      replyTo: email,
    }

    const info = await transporter.sendMail(mailOptions)

    return { success: true, data: info }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}

