import sgMail from '@sendgrid/mail';
import { sendGridSecret } from "./secrets"

export const sendMsg = (emailAdr: string, number: string) => {
    sgMail.setApiKey(sendGridSecret);
    const msg = {
        to: emailAdr,
        from: 'mihran.guyumjyan@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        html: `Your verification code is ${number}`,
    };
    return sgMail.send(msg);
};