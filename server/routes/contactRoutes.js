// routes/contact.js

const express = require("express");
const Message = require("../models/Message");
const transporter = require("../utils/mailer.js");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, content } = req.body;
  if (!name || !email || !content) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }
  try {
    // Save to DB
    const message = await Message.create({ name, email, content });
    // Try to send emails, but don't fail if it errors
    try {
      await transporter.sendMail({
        from: `"PrebuiltUI" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: "New Message from Website",
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${content}</p>
        `,
      });
      await transporter.sendMail({
        from: `"PrebuiltUI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thanks for reaching out!",
        html: `
          <h3>Hey ${name},</h3>
          <p>Thanks for contacting PrebuiltUI! We'll be in touch soon.</p>
          <p>– The PrebuiltUI Team</p>
        `,
      });
    } catch (emailErr) {
      console.error("Contact email error:", emailErr);
    }
    res.status(200).json({ success: true, message: "Message sent and saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to save message." });
  }
});

module.exports = router;
