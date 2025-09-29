const express = require('express');
const { sendEmailToReceiver, sendEmailToSender } = require('../utils/mailer');
const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, content } = req.body;

    if (!name || !email || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const senderData = { name, email, content };

    // Send email to receiver (Laiba)
    await sendEmailToReceiver(senderData);
    
    // Send confirmation email to sender
    await sendEmailToSender(senderData);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});

module.exports = router;