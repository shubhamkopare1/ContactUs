const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);  

// Function to send email
const sendConfirmationEmail = async (toEmail, userName) => {
  const msg = {
    to: toEmail,
    from: 'kopareshubham60@gmail.com',
    subject: 'Thank you for contacting us!',
    text: `Hello ${userName},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nYour Company Name`,
    html: `<p>Hello ${userName},</p><p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p><p>Best regards,</p><p>Your Company Name</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email', error);
  }
};
module.exports = sendConfirmationEmail;