// const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// api/contact-us
export default async function contactUs(req, res) {
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
    // res.statusCode = 200;
    // res.json({ message: 'wahwaH' });
      

    // Load the service account credentials
    // const credentials = require('./developer-395015-1424828da512.json');
  
    // // Configure the JWT client
    // const jwtClient = new google.auth.JWT(
    //     credentials.client_email,
    //     null,
    //     credentials.private_key,
    //     ['https://www.googleapis.com/auth/gmail.send']
    // );
  
    // try {
    //     // Authorize the client
    //     await jwtClient.authorize();
    
    //     // Create a new Gmail API client
    //     const gmail = google.gmail({ version: 'v1', auth: jwtClient });
    
    //     // Construct the email message
    //     const email = {
    //         raw: btoa(
    //         'From: noreply@developer-395015.iam.gserviceaccount.com\r\n' +
    //         'To: josh.chasnov@gmail.com\r\n' +
    //         'Subject: EMAIL_SUBJECT\r\n' +
    //         'Content-Type: text/plain; charset=utf-8\r\n\r\n' +
    //         'EMAIL_CONTENT'
    //         )
    //     };
    
    //     // Send the email
    //     const response = await gmail.users.messages.send({
    //         userId: 'me',
    //         requestBody: email
    //     });
    
    //     console.log('Email sent:', response.data);
        
    //     res.statusCode = 200;
    //     res.json({ message: 'email sent' });
    // } catch (error) {
    //     console.error('Error sending email:', error);
        
    //     res.statusCode = 200;
    //     res.json({ message: error });
    // }
}