const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// api/contact-us
export default async function contactUs(req, res) {
    if (req.method === 'POST') {
        bodyParser.urlencoded({ extended: true }) (req, res, () => {
            const body = req.body;

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: body });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            
            const content = 'First name: ' + body['first-name'] + '\n' +
                            'Last name: ' + body['last-name'] + '\n' +
                            'Phone number: ' + body['phone-number'] + '\n' +
                            'Email: ' + body['email'] + '\n' +
                            'Pick up: ' + body['pick-up'] + '\n' +
                            'Drop off: ' + body['drop-off'] + '\n' +
                            'Flight: ' + body['flight'] + '\n' +
                            'Is rideshare: ' + body['isRideshare'] + '\n' +
                            'Body: ' + body['body'];


            const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: 'josh.chasnov@gmail.com',
                subject: 'Submitted Contact Us Form',
                text: content,
            };
              
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.error('Error sending email: ', error);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ message: error });
                } else {
                    console.log('Email sent: ', info.response);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ message: 'Email sent successfully. ' });
                }
            });
        });
    } else if (req.method === 'GET') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ message: 'No such method. ' });
    }
}