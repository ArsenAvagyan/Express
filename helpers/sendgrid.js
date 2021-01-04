import sgMail from '@sendgrid/mail';

export const sendMsg = (emailAdr, number) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: emailAdr,
        from: 'mihran.guyumjyan@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        html: `Your verification code is ${number}`,
    };
    return sgMail.send(msg);
};