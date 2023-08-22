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
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            let html = `
            <!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Your Message Subject or Title</title>
      <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap');

        body {
            font-family: 'Raleway', sans-serif;
            line-height: 1.4;
        }

        h1 {
            font-size: 1.5em;
        }

        .frame {
            width: 70%;
            height: fit-content;
            margin: auto;
        }

        .frame .message mark {
            color: red;
            background-color: inherit;
        }

        .frame .message {
            width: 100%;
            height: fit-content;
            border-width: 1px;
            border-style: solid;
            border-color: #afafaf;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;
            background-color: #fff3f2;;
        }
                
        .frame .message * h2 {
            margin: 0px;
            font-size: 0.8em;
            font-weight: 600;
        }
        
        .frame .message * .form {
            height: 50px;
            width: 100%;
            background-color: white;
            border: none;
            border-style: solid;
            border-color: #CFCFCF;
            border-width: 1px;
            border-radius: 3px;
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 10px;
            padding-right: 10px;
            font-family: Georgia, 'Times New Roman', Times, serif;
            font-size: 1em;
        }
        
        @media screen and (min-width: 720px) {
            .frame .message .name {
                display: grid;
                grid-template-columns: 40% 40%;
                column-gap: 30px;
                row-gap: 2px;
            }

            .frame .message .pick-up-drop-off-location {
                display: grid;
                grid-template-columns: 45% 45%;
                column-gap: 30px;
                row-gap: 2px;
            }
        }

        @media screen and (max-width: 720px) {
            .frame .message .name {
                display: grid;
                grid-template-columns: 90%;
                column-gap: 10px;
                row-gap: 20px;
            }

            .frame .message .pick-up-drop-off-location {
                display: grid;
                grid-template-columns: 90%;
                column-gap: 10px;
                row-gap: 20px;
            }
        }

        .frame .message .email {
            display: grid;
            grid-template-columns: 50%;
            row-gap: 2px;
        }

        .frame .message .phone-number {
            display: grid;
            grid-template-columns: 810px;
            row-gap: 2px;
        }

        .frame .message .phone-number .phone-number-form {
            display: grid;
            grid-template-columns: fit-content(100%) 135px;
        }

        .frame .message .phone-number .phone-number-form .prefix {
            border-radius: 3px 0px 0px 3px;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            padding-left: 2px;
            padding-right: 2px;
        }

        .frame .message .phone-number .phone-number-form .prefix p {
            text-align: center;
        }

        .frame .message .phone-number .phone-number-form .body {
            transform: translateX(5px);
            border-radius: 0px 3px 3px 0px;
        }

        .frame .message .flight {
            display: grid;
            grid-template-columns: 100%;
            row-gap: 2px;
        }

        .frame .message .flight .form {
            width: 65px;
        }

        .frame .message .comments {
            display: grid;
            grid-template-columns: 95%;
            row-gap: 2px;
        }

        .frame .message .comments .form {
            width: 100%;
            max-width: 100%;
            min-width: 50%;
        }

        .frame .message .carpool .is-carpool {
            display: inline;
            vertical-align: middle;
        }

        .frame .message .carpool h2 {
            display: inline;
        }

        .copywrite {
            padding-top: 50px;
            background-color: white;
            text-align: center;
        }

        .copywrite a {
            margin-left: 15px;
            margin-right: 15px;
            text-decoration: none;
        }

        .copywrite a img {
            filter: brightness(0);
        }

        .copywrite p {
            font-size: 1em;
        }
      </style>
  </head>
  <body>
    <div class="frame">
      <h1>Thank you for reaching out!</h1>
      <p>
      Hi firstname, 
      <br>
      <br>
      Your message has been recieved, and we will reach out as soon as possible. Please make sure your details are correct by reviewing the content of your message is displayed below:
      </p>
      <div class="message">
            <div class="name">
                <div class="first-name">
                  <h2>Traveller's first name <mark>*</mark></h2>
                  <input id="first-name-form" class="form" type="text" disabled />
                </div>
                <div class="last-name">
                  <h2>Traveller's last name <mark>*</mark></h2>
                  <input id="last-name-form" class="form" type="text" disabled />
                </div>
              </div>
              <div class="email">
                <h2>Email address <mark>*</mark></h2>
                <input id="email-form" class="form" type="text" disabled />
              </div>
              <div class="phone-number">
                <h2>Phone number <mark>*</mark></h2>
                <div class="phone-number-form">
                  <span class="form prefix"><p>+1</p></span>
                  <input id="phone-form" class="form body" type="text" disabled />
                </div>
              </div>
              <div class="pick-up-drop-off-location">
                <div class="pick-up-location">
                  <h2>Pick up location <mark>*</mark></h2>
                  <input id="pick-up-form" class="form" type="text" disabled />
                </div>
                <div class="drop-off-location">
                  <h2>Drop off location <mark>*</mark></h2>
                  <input id="drop-off-form" class="form" type="text" disabled />
                </div>
              </div>
              <div class="flight">
                <h2>Flight number (if applicable)</h2>
                <input id="flight-form" class="form" type="text" disabled />
              </div>
              <div class="comments">
                <h2>Any other comments?</h2>
                <textarea id="comments-form" class="form" rows="4" cols="50" disabled></textarea>
              </div>
              <div class="carpool">
                <input id="rideshare-checkbox" class="is-carpool" type="checkbox" disabled />
                <h2>If available, I would like to carpool. </h2>
              </div>
      </div>
    </div>

    <section class="copywrite"> 
        <a href="https://www.facebook.com/citygaltransportation">
          <image src="res/ico/facebook.svg" style="height: 20px; "></image>
        </a>
        <a href="https://www.linkedin.com/in/virginia-klinger-21917b64/">
          <image src="res/ico/linked-in.svg" style="height: 20px; "></image>
        </a>
        <a href="tel:6128401687">
          <image src="res/ico/phone.svg" style="height: 20px; "></image>
        </a>
        <p>
          © 2021 City Gal Transport. All rights reserved.
        </p>
      </section>
  </body>
</html>
            `
            
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
                html: html  ,
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