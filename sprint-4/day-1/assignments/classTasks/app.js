// const http = require('http-server');

// const server = http.createServer((req, res) => {
//     if(req.url = '/'){
//         let body = req.body
//         req.on('data',(chunk)=>{
//             body += chunk;
//         });

//         buttEvent.e
//     }
// });

// buttEvent.emit('home',"this is a home route");

// // Start the server on port 8080 and log a message when it's running.
// server.listen(8080, () => {
//     console.log('Server is running on port 8080');
// });
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kumarsunny30066@gmail.com",
    pass: "mzur xzwo vtys zhbg",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'kumarsunny30066@gmail.com', // sender address
    to: "aniyantkumar@gmail.com", // list of receivers
    subject: "Hello bhai learning NODE✔", // Subject line
    text: "Hello to node", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
