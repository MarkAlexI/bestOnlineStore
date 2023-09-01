import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  auth: {
    user: `${process.env.MAILER_EMAIL}`,
    pass: `${process.env.MAILER_PASS}`
  }
});

const sendWelcomeEmail = (email) => {
  const mailOptions = {
    from: `${process.env.MAILER_EMAIL}`,
    to: email,
    subject: 'Ласкаво просимо до нашого магазину',
    text: 'Дякуємо за реєстрацію у нашому магазині!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('An error occurred when sending the letter: ', error);
    } else {
      console.log('The letter has been sent: ', info.response);
    }
  });
};

export default sendWelcomeEmail;