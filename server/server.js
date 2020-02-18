/**
 * Capture And Send - Server Config
 * https://github.com:umuthan/capture-and-send.git
 *
 * Author: Umuthan Uyan
 *
 */

const nodemailer = require('nodemailer');
const express = require('express');
const creds = require('./config');

var transport = {
  host: creds.SERVER, // e.g. smtp.gmail.com
  auth: {
    user: creds.USER,
    pass: creds.PASS
  },
  secure: creds.SECURE,
  tls: {
    rejectUnauthorized: creds.REJECTUNAUTHORIZED
  },
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});

const app = express();
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const port = process.env.PORT || creds.PORT;

app.use(cors());

app.use(express.static('public'));

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage });
const type = upload.single('pdf');

// serve the app
app.use('/', express.static('../build'));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a POST route
app.post('/send', type, ( req, res ) => {

    var message = {
      from: creds.FROM, // sender address
      to: creds.TO, // list of receivers
      subject: creds.SUBJECT, // Subject line
      text: creds.TEXT, // plain text body
      attachments: {
        filename: 'attachment.pdf',
        path: req.file.path
      }, // attachment
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        res.json({
          msg: 'fail'
        });
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
});
