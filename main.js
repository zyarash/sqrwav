const express = require("express")
const nodemailer = require("nodemailer")
const path = require("path")

const { check, validationResult } = require("express-validator");

const app = express()
const port = process.env.PORT || "3000";


app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());


app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/contact", [
  check("subject", "Subject cannot be empty").not().isEmpty(),
  check("name", "Name cannot be empty").not().isEmpty(),
  check("email", "Email cannot be empty").not().isEmpty(),
  check("message", "Message cannot be empty").not().isEmpty(),

  check("subject").isLength({ min: 1, max: 100}).trim().escape(),
  check("name").isLength({ min: 1, max: 100}).trim().escape(),    
  check("email").isEmail().normalizeEmail(),
  check("message").trim(),

], (request, response) => {
  let errors = validationResult(request);

  if (!errors.errors.length) {
    let message = `
      Subject: ${request.body.subject}\n
      Name: ${request.body.name}\n
      Email: ${request.body.email}\n\n
      ${request.body.message}
    `;

    let emailDetail = {
      from: "hi.imma.bear@gmail.com",
      to: "hi.imma.bear@gmail.com",
      subject: request.body.subject,
      text: message,
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hi.imma.bear@gmail.com",
        pass: "cfqt tsio gpuc anrs"
      },
    });

    transporter.sendMail(emailDetail, function(error, info) {
      if (error) {
        let serverErrors = { errors: [{msg: error}] };
        response.status(500).send(serverErrors).end();
      }
      else { response.status(200).end(); }
      transporter.close();
    });
  }
  else {
    response.status(500).send(errors).end();
  }
});


app.listen(port, () => {
    console.log(`Square Wave Management`);
    console.log(`Listening on port ${port}`);
});
