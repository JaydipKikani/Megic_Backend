const nodemailer = require('nodemailer');

const generateRandomToken = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const emailVerification = async (req, res) => {
    try {
        // Assuming the email is provided in the request body
        const emailaddress = req.body.email;

        // Generate a random 4-digit OTP
        const otp = generateRandomToken();

        // Create a nodemailer transporter using your SMTP settings
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        // Email message configuration
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailaddress,
            subject: 'Email Verification',
            text: `Your OTP for verification is: ${otp}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with the OTP (for demonstration purposes, you might want to avoid exposing the OTP in a production environment)
        res.status(200).json({
            status: true,
            error: false,
            msg: 'Verification OTP sent successfully.',
            data: {
                otp,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: true,
            msg: 'Error sending verification email.',
        });
    }
};

module.exports = emailVerification;
