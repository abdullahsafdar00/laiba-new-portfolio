const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmailToReceiver = (senderData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'laibagfx421@gmail.com',
    subject: '🎨 New Contact Form Submission - Portfolio Website',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #ec4899, #be185d); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .message-box { background-color: #fdf2f8; border-left: 4px solid #ec4899; padding: 20px; margin: 20px 0; }
          .info-row { display: flex; margin: 15px 0; }
          .label { font-weight: bold; color: #be185d; min-width: 80px; }
          .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ New Message from Portfolio Website</h1>
          </div>
          <div class="content">
            <h2 style="color: #be185d;">Contact Details</h2>
            <div class="info-row">
              <span class="label">Name:</span>
              <span>${senderData.name}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span>${senderData.email}</span>
            </div>
            <div class="message-box">
              <h3 style="color: #be185d; margin-top: 0;">Message:</h3>
              <p style="line-height: 1.6;">${senderData.content}</p>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              This message was sent from your portfolio contact form on ${new Date().toLocaleDateString()}.
            </p>
          </div>
          <div class="footer">
            <p>Portfolio Website Contact System</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
  
  return transporter.sendMail(mailOptions);
};

const sendEmailToSender = (senderData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: senderData.email,
    subject: '✅ Message Received - Thank You for Contacting Laiba!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #ec4899, #be185d); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .highlight-box { background-color: #fdf2f8; border: 2px solid #ec4899; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center; }
          .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; }
          .social-links { margin: 20px 0; }
          .social-links a { color: #ec4899; text-decoration: none; margin: 0 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎨 Thank You for Your Message!</h1>
          </div>
          <div class="content">
            <h2 style="color: #be185d;">Hi ${senderData.name}! 👋</h2>
            <p>Thank you for reaching out through my portfolio website. I'm excited to learn about your project!</p>
            
            <div class="highlight-box">
              <h3 style="color: #be185d; margin-top: 0;">✅ Your Message Has Been Received</h3>
              <p><strong>I will get back to you within 24 hours</strong> with a detailed response about your project requirements.</p>
            </div>
            
            <h3 style="color: #be185d;">What Happens Next?</h3>
            <ul style="line-height: 1.8;">
              <li>📧 I'll review your message and project details</li>
              <li>💡 Prepare initial ideas and suggestions</li>
              <li>📞 Reach out to discuss your vision in detail</li>
              <li>🎯 Provide you with a customized proposal</li>
            </ul>
            
            <p>In the meantime, feel free to check out my latest work and connect with me on social media:</p>
            
            <div class="social-links">
              <a href="https://linkedin.com/in/laiba">LinkedIn</a> |
              <a href="https://instagram.com/laibagfx">Instagram</a> |
              <a href="https://upwork.com/freelancers/laibagfx">Upwork</a>
            </div>
            
            <p style="color: #6b7280; font-style: italic;">
              "Great design is not just what it looks like and feels like. Great design is how it works." - Steve Jobs
            </p>
          </div>
          <div class="footer">
            <p><strong>Laiba Safdar</strong> - Graphic Designer</p>
            <p>📧 laibagfx421@gmail.com | 📱 +92 322-9797462</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
  
  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmailToReceiver, sendEmailToSender };