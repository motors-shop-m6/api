import 'dotenv/config'
import { createTransport } from 'nodemailer'
import { IEmailRequest } from '../interfaces/nodemailerInterface'

const sendEmail = async({subject, text, email}: IEmailRequest) => {
    const transporter = createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      html: text
  }).then(() => {
      console.log('Email send with success')
  }).catch((err) => {
      console.log(err)
      throw new Error('Error sending email, try again later')
  })
}

export { sendEmail }
