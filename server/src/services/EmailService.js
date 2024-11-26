// src/services/EmailService.js
import nodemailer from 'nodemailer';

// Membuat transporter untuk mengirim email
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Atau gunakan service lain seperti SendGrid, Mailgun
  auth: {
    user: 'aviana.22059@mhs.unesa.ac.id',  // Email pengirim (misalnya: email@gmail.com)
    pass: 'bups vxlr rwyd mpvp',  // Password email pengirim atau app password
  },
});

// Fungsi untuk mengirim email undangan
const sendInvitationEmail = async (recipientEmail, invitationLink) => {
  try {
    const mailOptions = {
      from: 'aviana.22059@mhs.unesa.ac.id',  // Email pengirim
      to: recipientEmail,            // Email penerima
      subject: 'You are invited to join as a Writer', // Subjek email
      text: `Hello, you have been invited to join as a writer. Please accept the invitation using the link below:
             ${invitationLink}`, // Konten email
    };

    await transporter.sendMail(mailOptions); // Kirim email
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send invitation email');
  }
};

export default { sendInvitationEmail };
