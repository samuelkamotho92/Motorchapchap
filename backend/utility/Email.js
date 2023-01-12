const nodemailer = require('nodemailer');
exports.sendEmail = async (options)=>{
    //create a transport
   const transport = nodemailer.createTransport({
        host:process.env.EMAIL_SERVICE,
        PORT:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });
//optiosn object
    const mailOptions = {
from:'motorchapchap@gmail.com',
to: options.email,
subject:options.subject,
text:options.message,
html:
`<a href=${options.url}>${options.message}</a>`
    }

    await transport.sendMail(mailOptions)
}