# Capture And Send

![Image of CaptureAndSendLogo](http://umuthan.com/wp-content/uploads/2020/01/captureandsendlogo.png)

This application capture from your camera and send your captured picture with pdf file through e-mail.

## How to run the app

### First you need to install all dependencies:

Inside server folder:

'npm install'

Project root folder:

'npm install'

Change config.js files of your own credits,

### Run the server

Inside server folder

'node server.js'

## Dependencies

### Server (BackEnd)
* NodeMailer: To send mail with SMTP credentials.
* Multer: To upload PDF file inside server.
* Express: To create an API. Connecting Nodemailer to React App.

### App (FrontEnd)
* react-pdf: To create PDF from Captured Image.
* node-sass: SCSS compiler

## Screenshots

![Image of CaptureAndSendScreenshot](http://umuthan.com/wp-content/uploads/2020/01/captureandsendmobile.png)
