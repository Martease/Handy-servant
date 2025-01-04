const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use `true` for 465, `false` for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { fullname, email, date, time, service } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'handyservant864@gmail.com',
        subject: 'New Service Booking',
        text: `
            Full Name: ${fullname}
            Email: ${email}
            Date: ${date}
            Time: ${time}
            Service: ${service}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Failed to send email');
        }
        res.status(200).send('Email sent successfully');
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});