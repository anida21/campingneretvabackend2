const express = require('express');
const router = express.Router();
const { sendEmail, sendMessage, sendRaftReservation, sendConfirmationEmail } = require('../controller/appController.js') // Dodajte ovu liniju


router.post('/sendEmail', async (req, res) => {
  const { to, formData } = req.body;

  try {
    await sendEmail(to, formData);
    await sendConfirmationEmail( 
      formData.Email, // Email korisnika
      formData.Name,  // Ime korisnika
      formData.CheckIn, // Datum prijave
      formData.CheckOut, // Datum odjave
      formData.TypeOfCamping, // Tip raftinga (ili kampovanja, zavisno o nazivu)
      formData.numberOfGuests  
  );
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


router.post('/sendRaftReservation', async (req, res) => {
  const { to, formData } = req.body;

  try {
    await sendRaftReservation(to, formData);
    
    // Dodajte poziv za slanje potvrde o emailu nakon slanja rafting rezervacije
    await sendConfirmationEmail(
      formData.Email, // Email korisnika
      formData.Name,  // Ime korisnika
    );
    
    res.status(200).json({ message: 'Rafting reservation sent and confirmation email sent successfully' });
  } catch (error) {
    console.error('Error sending rafting reservation or confirmation email:', error);
    res.status(500).json({ error: 'Failed to send rafting reservation or confirmation email' });
  }
});


module.exports = router;
