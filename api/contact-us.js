const nodemailer = require('nodemailer');

// api/contact-us
export default async function contactUs(req, res) {
    res.statusCode = 200;
    res.json({ message: req });
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: 'josh.chasnov@gmail.com',
        subject: 'EMAIL_SUBJECT',
        text: 'EMAIL_CONTENT',
    };
      
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error sending email:', error);
            res.statusCode = 200;
            res.json({ message: error });
        } else {
            console.log('Email sent:', info.response);
            res.statusCode = 200;
            res.json({ message: 'email sent' });
        }
    });
}