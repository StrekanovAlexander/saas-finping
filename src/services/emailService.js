import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendActivationEmail(email, token) {
    const activationLink = `http://localhost:5173/activate/${token}`;
    const mailOptions = {
        from: '"FinPing" <no-reply@finping.com>',
        to: email,
        subject: "Activate your FinPing account",
        html: `<p>Click <a href="${activationLink}">here</a> to activate your account.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch(err) {
        console.error(`Email sending error: `, err.message);
    }
}


