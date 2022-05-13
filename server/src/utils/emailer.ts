import nodemailer from 'nodemailer';


const sendMail = async (
    options: { to: string, subject: string, text: string }
) => {
    // Create email transporter
    const {
        EMAIL_USERNAME,
        EMAIL_PASSWORD,
        EMAIL_HOST,
        EMAIL_PORT
    } = process.env;

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT) || 0,
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD
        }
    })

    // Create email message object
    const { to, subject, text } = options;
    const emailOptions = {
        from: 'Yummyfood <noreply@yummyfood.com>',
        to, subject, text
    };

    // Sent email message
    await transporter.sendMail(emailOptions);
}


export default {
    sendMail
};
