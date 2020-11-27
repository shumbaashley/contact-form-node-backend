const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express()

dotenv.config()
app.use(cors())

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD 
    }
});

// verify connection configuration
transporter.verify((error) => {
    if (error) {
    console.log(error);
    } else {
    console.log("Server is ready to take our messages");
    }
});

router.post('/send', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const subject = req.body.subject
    const company = req.body.company
    const message = req.body.message

    const content = `name: ${name} \n company : ${company} \n email: ${email} \n subject: ${subject} \n message: ${message} `

    const mail = {
        from: name,
        to: process.env.EMAIL_USER,
        subject: subject,
        text: content
    }
    
    transporter.sendMail(mail, (err) => {
    if (err) {
        res.json({status: 'fail'})
    } else {
        res.json({status: 'success'})
    }
  })
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))