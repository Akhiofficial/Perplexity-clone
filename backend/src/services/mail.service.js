import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify().then(() => {
    console.log('Email server is ready to send messages');
}).catch((error) => {
    console.log(error);
});


export async function sendEmail({ to, subject, text, html }) {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        text,
        html,
    };
    await transporter.sendMail(mailOptions);
}