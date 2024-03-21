const nodemailer = require("nodemailer");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const sendMail = async (req, res) => {
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

  try {
    const { templateType, email, subject, invoiceHTML } = req.body;
    const file = req.file;

    const invoicePDF = fs.readFileSync(`./assets/invoices/${file.filename}`);

    let invoiceHTMLContent = '';

    // Check if invoiceHTML is provided before reading the file
    if (invoiceHTML) {
      // Generate a unique filename using UUID
      const uniqueFileName = `invoice_${uuidv4()}.html`;

      // Write the HTML content to a file with the unique filename
      fs.writeFileSync(`./assets/invoices/${uniqueFileName}`, invoiceHTML);

      // Set the unique filename in mailOptions
      invoiceHTMLContent = uniqueFileName;
    }

    let fromAddress;
    let emailTemplate;

    if (templateType === 'usemail') {
      emailTemplate = 'User Email Template Content';
      fromAddress = req.body.from;
    } else if (templateType === 'generalInvoice') {
      emailTemplate = 'General Invoice Email Template Content';
      fromAddress = 'tourism0@gmail.com';
    } else {
      return res.status(400).json({
        status: false,
        error: true,
        msg: 'Invalid template type',
      });
    }

    const mailOptions = {
      from: fromAddress,
      to: email,
      subject: subject,
      text: emailTemplate,
      html: invoiceHTMLContent ? fs.readFileSync(`./assets/invoices/${invoiceHTMLContent}`).toString() : '', // Include the HTML content
      attachments: [
        {
          filename: 'invoice.pdf',
          content: invoicePDF,
          encoding: 'base64',
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          status: false,
          error: true,
          msg: error.toString(),
        });
      }
      res.status(200).json({
        status: true,
        error: false,
        msg: 'Email sent: ' + info.response,
      });
    });
  } catch (e) {
    console.log("error: %s", e);
    return res.status(500).json({
      status: false,
      error: true,
      msg: e.message,
    });
  }
};

module.exports = sendMail;
