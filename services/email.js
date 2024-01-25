const nodemailer = require("nodemailer");
const fs = require("fs");

const sendMail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "webdev826@gmail.com",
      pass: "cpbb xkqg lird snvr",
    },
  });

  const file = req.file;

  try {
    const pdfAttachment = fs.readFileSync(`./assets/invoices/${file.filename}`);
    const info = await transporter.sendMail({
      from: '"tourism0@gmail.com" <foo@example.com>',
      to: req.body.email,
      subject: req.body.subject,
      text: "This is template!",
      html: "<h2>This is the template</h2>",
      attachments: [
        {
          filename: "your_attachment.pdf", // Change the filename as needed
          content: pdfAttachment,
          encoding: "base64",
        },
      ],
    });

    if (file) {
      try {
        fs.unlinkSync(`./assets/invoices/${file.filename}`);
      } catch (e) {
        return res.json({
          status: false,
          error: true,
          msg: e.message,
        });
      }
    }

    console.log("Message sent: %s", info.messageId);
    return res.json(info);
  } catch (e) {
    console.log("error: %s", e);
    return res.json({
      status: false,
      error: true,
      msg: e.message,
    });
  }
};

module.exports = sendMail;
