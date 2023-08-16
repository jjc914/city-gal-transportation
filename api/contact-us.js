const { google } = require('googleapis');

// api/contact-us
export default function contactUs(req, res) {
    res.statusCode = 200;
    res.json({ message: 'AHHHH' });
    sendEmail();
}

async function sendEmail() {
    // Load the service account credentials
    const credentials = require('/api/developer-395015-1424828da512.json');
  
    // Configure the JWT client
    const jwtClient = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/gmail.send']
    );
  
    try {
      // Authorize the client
      await jwtClient.authorize();
  
      // Create a new Gmail API client
      const gmail = google.gmail({ version: 'v1', auth: jwtClient });
  
      // Construct the email message
      const email = {
        raw: btoa(
          'From: noreply@developer-395015.iam.gserviceaccount.com\r\n' +
          'To: josh.chasnov@gmail.com\r\n' +
          'Subject: EMAIL_SUBJECT\r\n' +
          'Content-Type: text/plain; charset=utf-8\r\n\r\n' +
          'EMAIL_CONTENT'
        )
      };
  
      // Send the email
      const response = await gmail.users.messages.send({
        userId: 'me',
        requestBody: email
      });
  
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }