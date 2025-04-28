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
        name: 'Camping Neretva',
        intro: `Here are the reservation details:`,
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
        name: 'Camping Neretva',
        intro: `This is a message: `,
        table: {
          data: [
            { item: 'Name', description: Name },
            { item: 'Email', description: Email },
            { item: 'Message', description: Message || 'N/A' }
          ],
        },
        outro: 'Please contact customer in next 24 hours for this message.',
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: EMAIL,
      to: to,
      subject: 'Camping Neretva Message Details',
      html: mail,
    };

    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendRaftReservation = async (to, formData) => {
  try {
    if (!formData || typeof formData !== 'object') {
      throw new Error('Invalid formData. Expected an object.');
    }

    const { Name,PhoneNumber,NumberOfGuests, CheckIn, Email,TypeOfRafting, Message } = formData;

    if (!Name || !Email) {
      throw new Error('Name and Email are required fields.');
    }
     // Kreiramo novi objekt sa samo relevantnim poljima
     const filteredData = {
      Name: formData.Name,
      PhoneNumber: formData.PhoneNumber,
      Email: formData.Email,
      NumberOfGuests: formData.NumberOfGuests,
      CheckIn: formData.CheckIn,
      Message: formData.Message,
      TypeOfRafting: formData.TypeOfRafting
    };

    console.log("Nakon filtriranja:", filteredData);

    if (!filteredData.Name || !filteredData.Email) {
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
        name: 'Camping Neretva',
        intro: `This is a rafting reservation: `,
        table: {
          data: [
            { item: 'Name', description: Name },
            { item: 'Phone Number', description: PhoneNumber },
            { item: 'Email', description: Email },
            { item: 'Number of Guests', description: NumberOfGuests },
            { item: 'Check In', description: CheckIn },
            { item: 'Type of Rafting', description: TypeOfRafting },
            { item: 'Message', description: Message || 'N/A' }
          ],
        },
        outro: 'Please contact customer in next 24 hours for this message.',
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: EMAIL,
      to: to,
      subject: 'Camping Neretva Rafting Reservation Details',
      html: mail,
    };

    await transporter.sendMail(message);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


async function sendConfirmationEmail(userEmail, userName) {
  let transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: "neretvac@gmail.com",  
      pass: "icmlljbvxohqxwut", 
    },
  });

  let mailGenerator = new Mailgen({
      theme: "default",
      product: {
          name: "Camping Neretva",
          link: "https://campingneretva.ba",
      },
  });

  let emailBody = mailGenerator.generate({
      body: {
          name: userName,
          intro: "Thanks for making reservation!",
          outro: " We appreciate your trust in us and look forward to welcoming you soon! If you have any questions in the meantime, feel free to contact us at campingneretva@gmail.com",
      },
  });

  let mailOptions = {
      from: "campingneretva@gmail.com",
      to: userEmail,
      subject: "Reservation Confirmation",
      html: emailBody,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail, sendMessage, sendRaftReservation, sendConfirmationEmail};
