const nodemailer = require('nodemailer');
const sendEmail = async (options)=>{
    console.log('check details');
    console.log(options.email,options.message,options.url,options.subject);
    //create a transport
   const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ba34cc6a3b11a4",
    pass: "85f146e5ac06a7"
  }
    });
//optiosn object
    const mailOptions = {
from:'motorchapchap@gmail.com',
to: options.email,
subject:options.subject,
text:options.message,
html:
`<p>${options.message}</p>
<a href=${options.url}>CLICK ME</a>
`
    }

    await transport.sendMail(mailOptions)
}


module.exports = sendEmail;