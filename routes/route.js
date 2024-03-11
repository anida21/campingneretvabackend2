const express = require('express');
const router = express.Router();
const { sendEmail, sendMessage } = require('../controller/appController.js') // Dodajte ovu liniju


router.post('/sendEmail', async (req, res) => {
  const { to, formData } = req.body;

  try {
    await sendEmail(to, formData);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

router.post('/sendMessage', async (req, res) => {
  const { to, formData } = req.body;

  try {
    await sendMessage(to, formData);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
