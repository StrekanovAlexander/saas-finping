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
