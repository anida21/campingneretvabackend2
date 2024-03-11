const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js');

const sendEmail = async (to, formData) => {
  try {
    console.log(formData);
    if (!formData || typeof formData !== 'object') {
      throw new Error('Invalid formData. Expected an object.');
    }

    const { Name, PhoneNumber, Email, TypeOfVehicle, CheckBox1, CheckBox2, CheckBox3, NumberOfGuests, CheckIn, CheckOut, Message, TypeOfCamping } = formData;

    if (!Name || !PhoneNumber || !Email) {
      throw new Error('Name, PhoneNumber, and Email are required fields.');
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    let MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/',
      },
    });

    let response = {
      body: {
        name: 'Camping Neretva Reservation',
        intro: `Here are the details:`,
        table: {
          data: [
            { item: 'Name', description: Name },
            { item: 'Phone Number', description: PhoneNumber },
            { item: 'Email', description: Email },
            { item: 'Type of Vehicle', description: TypeOfVehicle },
            { item: 'Type of Camping', description: TypeOfCamping },
            { item: 'Pets', description: CheckBox1 ? 'Yes' : 'No' },
            { item: 'Electricity', description: CheckBox2 ? 'Yes' : 'No' },
            { item: 'Number of Guests', description: NumberOfGuests },
            { item: 'Check In', description: CheckIn },
            { item: 'Check Out', description: CheckOut },
            { item: 'Message', description: Message || 'N/A' },
          ],
        },
        outro: 'Please contact customer in next 24 hours for this reservation.',
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: EMAIL,
      to: to,
      subject: 'Camping Reservation Details',
      html: mail,
    };

    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


const sendMessage = async (to, formData) => {
  try {
    console.log(formData);
    if (!formData || typeof formData !== 'object') {
      throw new Error('Invalid formData. Expected an object.');
    }

    const { Name, Email, Message } = formData;

    if (!Name || !Email) {
      throw new Error('Name and Email are required fields.');
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    let MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/',
      },
    });

    let response = {
      body: {
        name: 'Camping Neretva message',
        intro: `Message`,
        table: {
          data: [
            { item: 'Name', description: Name },
            { item: 'Email', description: Email },
            { item: 'Message', description: Message || 'N/A' }
          ],
        },
        outro: '',
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: EMAIL,
      to: to,
      subject: 'Camping Message Details',
      html: mail,
    };

    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
module.exports = { sendEmail, sendMessage };
