/**
 * Capture And Send - Server Config
 * https://github.com:umuthan/capture-and-send.git
 *
 * Author: Umuthan Uyan
 *
 */

 module.exports = {
  PORT: 5000, // Application port - If you don't have any app on 5000 don't change it -
  SERVER: 'SMTP_MAIL_SERVER_ADDRESS', // Smtp mail server address
  USER: 'SMTP_MAIL_USER_NAME', // Smtp mail user name
  PASS: 'SMTP_MAIL_PASSWORD', // Smtp Mail Password
  SECURE: false,
  REJECTUNAUTHORIZED: false,
  TO: 'MAIL_TO', // To address
  FROM: '"Capture And Send" <MAIL_TO>', // From name
  SUBJECT: 'Capture And Send Subject', // Mail Subject
  TEXT: 'Image attached to this email' // Mail Text Body
}
