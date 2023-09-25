const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// api/contact-us
export default async function contactUs(req, res) {
    console.log("Recieved contact us request. ");
    if (req.method === 'POST') {
        bodyParser.urlencoded({ extended: true }) (req, res, () => {
            const body = req.body;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDER_EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            let checked = '';
            if (body['is-rideshare']) checked = 'checked';

            let html = `
  <div style="color: black; overflow: hidden; background-color: white; width: fit-content; height: fit-content; margin: auto; font-size: 1em;">
    <table style="border-spacing: 10px; width: fit-content;">
      <tbody>
        <tr>
          <td style="font-size: 1.5em;">Thank you for reaching out!</td>
        </tr>
        <tr>
          <td style="width: 10px;">Hi ${body['first-name']}, 
            <br>
            <br>Your message has been received, and we will reach out as soon as possible. Please make sure your details are correct by reviewing the content of your message displayed below:
          </td>
        </tr>
        <tr>
          <td>
            <table style="height: fit-content; background-color: #fff3f2; padding: 10px; border: 1px solid #afafaf;">
              <tbody>
                <tr>
                  <td>
                    <table style="width: 400px;">
                      <tbody>
                        <tr>
                          <td style="font-size: 0.8em; font-weight: 600;">Traveller's first name</td>
                          <td style="font-size: 0.8em; font-weight: 600;">Traveller's last name</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form" style="width: 150px; height: 30px; line-height: 30px; background-color: white; border-radius: 3px; font-family: Georgia,Times New Roman,Times,serif; font-size: 1em; padding: 0px 10px 0px 10px; border: 1px solid #cfcfcf;">${body['first-name']}</div>
                          </td>
                          <td>
                            <div class="form" style="width: 150px; height: 30px; line-height: 30px; background-color: white; border-radius: 3px; font-family: Georgia,Times New Roman,Times,serif; font-size: 1em; padding: 0px 10px 0px 10px; border: 1px solid #cfcfcf;">${body['last-name']}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table style="width: 400px;">
                      <tbody>
                        <tr>
                          <td style="font-size: 0.8em; font-weight: 600;">Email address</td>
                        </tr>
                        <tr>
                          <td>
                            <div style="width: 300px; height: 30px; line-height: 30px; background-color: white; border-radius: 3px; font-family: Georgia,Times New Roman,Times,serif; font-size: 1em; padding: 0px 10px 0px 10px; border: 1px solid #cfcfcf;">${body['email']}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table style="width: 400px;">
                      <tbody>
                        <tr>
                          <td style="font-size: 0.8em; font-weight: 600;">Phone number</td>
                        </tr>
                        <tr>
                          <td>
                            <div style="display: inline-block; width: fit-content; height: 30px; line-height: 30px; background-color: white; border-radius: 3px 0px 0px 3px; font-family: Georgia,Times New Roman,Times,serif; font-size: 1em; padding: 0px 10px 0px 10px; border: 1px solid #cfcfcf;">+1</div>
                            <div style="display: inline-block; width: fit-contentpx; height: 30px; line-height: 30px; background-color: white; border-radius: 0px 3px 3px 0px; font-family: Georgia,Times New Roman,Times,serif; font-size: 1em; padding: 0px 10px 0px 10px; border: 1px solid #cfcfcf;">${body['phone-number']}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table style="width: 100%;">
                      <tbody>
                        <tr>
                          <td style="font-size: 0.8em; font-weight: 600;">Pick up location</td>
                          <td style="font-size: 0.8em; font-weight: 600;">Drop off location</td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form" style="width: 300px; height: 30px; line-height: 30px; background-color: white; border-radius: 3px; font-family: Georgia,Times New Roman,Times,serif; font-size: 1em; padding: 0px 10px 0px 10px; border: 1px solid #cfcfcf;">${body['pick-up']}</div>
                          </td>
                          <td>
                            <div class="form" style="width: 300px; height: 30px; line-height: 30px; background-color: white; border-radius: 3px; font-family: Georgia,Times New Roman,Times,serif; font-size: 1em; padding: 0px 10px 0px 10px; border: 1px solid #cfcfcf;">${body['drop-off']}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table style="width: 400px;">
                      <tbody>
                        <tr>
                          <td style="font-size: 0.8em; font-weight: 600;">Flight (if applicable)</td>
                        </tr>
                        <tr>
                          <td>
                            <div style="display: inline-block; width: 100%; height: 30px; line-height: 30px; background-color: white; border-radius: 3px; font-family: Georgia,Times New Roman,Times,serif; font-size: 1em; padding: 0px 10px 0px 10px; border: 1px solid #cfcfcf;">${body['flight']}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table style="width: 95%;">
                      <tbody>
                        <tr>
                          <td style="font-size: 0.8em; font-weight: 600;">Any other comments?</td>
                        </tr>
                        <tr>
                          <td>
                            <div style="display: inline-block; width: 100%; height: fit-content; min-height: 20px; background-color: white; border-radius: 3px; font-family: Georgia,Times New Roman,Times,serif; font-size: 1em; padding: 5px 10px 5px 10px; border: 1px solid #cfcfcf;">${body['body']}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 0.8em; font-weight: 600;">
                    <input style="display: inline; vertical-align: middle;" checked="checked" disabled="disabled" type="checkbox">
                    <div style="display: inline; vertical-align: middle;">If available, I would like to carpool.</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="width: 10px; color: grey; font-size: 0.9em;">
            *Note: Terminal one pickup location is departure door 4. Terminal two pickup location is departure door 8. 
          </td>
        </tr>
      </tbody>
    </table>
  </div>
            `

            const mainMailOptions = {
                from: process.env.SENDER_EMAIL_ADDRESS,
                to: process.env.RECEIVER_EMAIL_ADDRESS,
                subject: 'Submitted Contact Us Form',
                html: html,
            };

            const confirmationMailOptions = {
                from: process.env.SENDER_EMAIL_ADDRESS,
                to: body['email'],
                subject: 'Welcome to City Gal Transporatation!',
                html: html,
            }
              
            transporter.sendMail(mainMailOptions, function(error, info) {
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
            transporter.sendMail(confirmationMailOptions, function(error, info) {
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