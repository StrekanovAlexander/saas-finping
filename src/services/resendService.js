import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendActivationToken(email, token) {
    const activationLink = `https://app.finping.space/api/users/activate/${token}`;
    
    try {
        await resend.emails.send({
            from: `"FinPing Service" <no-reply@finping.space>`,
            to: email,
            subject: "FinPing Service: Activation Token",
            html: `<p>Click <a href="${activationLink}">here</a> to activate your account.</p>`,
        });
    } catch(err) {
        console.error(`Email sending error: `, err.message);
    }
}

export async function sendNotification(email, htmlContent) {
    try {
        await resend.emails.send({
            from: '"FinPing Service" <no-reply@finping.space>',
            to: email,
            subject: "Price Alert: Updates on your tracked assets",
            html: htmlContent,
        });
    } catch(err) {
        console.error(`Email sending error: `, err.message);
    }
}
