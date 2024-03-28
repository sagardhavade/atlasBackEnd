var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
app.use(cors('*'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var nm = require('nodemailer')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const multer = require('multer')
const upload = multer({
  storage: multer.memoryStorage()
})

var transporter = nm.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    // user: "tcpltechsp@gmail.com",
    // pass: "qkuldlknsemrtksg",
    user: 'info@atlasindia.co',
    pass: 'uztckilgvoobwjna'
  }
})

app.use('/', (req, res) => {
  res.json({message: 'Starting Server'})
})

app.post('/sendContactDetail', (req, res) => {
  let name = req.body.name
  let email = req.body.email
  let phone = req.body.phone
  let subject = req.body.subject
  let message = req.body.message
  var options = {
    // from : "tcpltechsp@gmail.com",
    // to : "tcpltechsp@gmail.com",
    from: 'info@atlasindia.co',
    to: 'info@atlasindia.co',
    subject: subject || 'Enquiry',
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atlas</title>
  <style>
    body {
      font-family: Arial, sans-serif
      line-height: 1.6
      margin: 0
      padding: 0
      background: linear-gradient(to right, #ff758c, #ff7eb3, #b47df7, #819dfc)
    }

    .container {
      max-width: 600px
      margin: 20px auto
      padding: 20px
      background-color: rgba(255, 255, 255, 0.8)
      border-radius: 10px
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
    }

    h1 {
      margin-bottom: 20px
      text-align: center
      color: #333
    }

    .details {
      padding: 20px
      border-radius: 5px
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1)
      background-color:rgba(0, 0, 0, 0.1)
    }

    .details p {
      margin-bottom: 10px
      color: #333
    }

    label {
      font-weight: bold
      color: #6c5b7b
      display: block
      margin-bottom: 5px
    }

    .user-info {
      margin-bottom: 20px
    }

    .user-info label {
      font-size: 18px
    }

    .user-info p {
      font-size: 16px
      margin: 5px 0
    }

    .attachment {
      margin-top: 20px
    }

    .attachment p {
      font-weight: bold
      color: #333
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Candidate Details</h1>
    <div class="details">
    <div class="user-info">
    <label for="subject">Subject:</label>
    <p>${subject}</p>
    </div>
      <div class="user-info">
        <label for="name">Name:</label>
        <p>${name}</p>
      </div>
      <div class="user-info">
        <label for="email">Email:</label>
        <p>${email}</p>
      </div>
      <div class="user-info">
        <label for="phone">Phone:</label>
        <p>${phone}</p>
      </div>
      <div class="user-info">
        <label for="message">Message:</label>
        <p>${message}</p>
      </div>
     
    </div>
  </div>
</body>
</html>`
  }

  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error)
      res.status(500).send("Couldn't send the email.")
    } else {
      console.log('Email sent:', info.response)
      res.send('Email sent successfully.')
    }
  })
})

app.post('/sendmail', upload.single('cv'), (req, res) => {
  let email = req.body.email
  let name = req.body.name
  let message = req.body.message
  let phone = req.body.phone
  let subject = req.body.subject // Add this line to get the subject
  // let cv = req.body.cv; // Add this line to get the cv (file)
  let cv = req.file
  console.log(email, name, message, phone, subject, cv)
  var options = {
    from: 'info@atlasindia.co',
    to: 'info@atlasindia.co',
    subject: subject || 'Enquiry', // Subject is optional, set a default if not provided
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atlas</title>
  <style>
    body {
      font-family: Arial, sans-serif
      line-height: 1.6
      margin: 0
      padding: 0
      background: linear-gradient(to right, #ff758c, #ff7eb3, #b47df7, #819dfc)
    }

    .container {
      max-width: 600px
      margin: 20px auto
      padding: 20px
      background-color: rgba(255, 255, 255, 0.8)
      border-radius: 10px
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
    }

    h1 {
      margin-bottom: 20px
      text-align: center
      color: #333
    }

    .details {
      padding: 20px
      border-radius: 5px
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1)
      background-color:rgba(0, 0, 0, 0.1)
    }

    .details p {
      margin-bottom: 10px
      color: #333
    }

    label {
      font-weight: bold
      color: #6c5b7b
      display: block
      margin-bottom: 5px
    }

    .user-info {
      margin-bottom: 20px
    }

    .user-info label {
      font-size: 18px
    }

    .user-info p {
      font-size: 16px
      margin: 5px 0
    }

    .attachment {
      margin-top: 20px
    }

    .attachment p {
      font-weight: bold
      color: #333
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Candidate Details</h1>
    <div class="details">
      <div class="user-info">
        <label for="name">Name:</label>
        <p>${name}</p>
      </div>
      <div class="user-info">
        <label for="email">Email:</label>
        <p>${email}</p>
      </div>
      <div class="user-info">
        <label for="phone">Phone:</label>
        <p>${phone}</p>
      </div>
      <div class="user-info">
        <label for="message">Message:</label>
        <p>${message}</p>
      </div>
      <div class="user-info">
        <label for="subject">Subject:</label>
        <p>${subject}</p>
      </div>
    </div>
    <div class="attachment">
      <p><strong>Attachment:</strong>${cv?cv.originalname:"File Not Found"}</p>
     
    </div>
  </div>
</body>
</html>`

  }

  if (cv) {
    options.attachments = [{
      filename: cv.originalname,
      content: cv.buffer
    }]
  }

  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error)
      res.status(500).send("Couldn't send the email.")
    } else {
      console.log('Email sent:', info.response)
      res.send('Email sent successfully.')
    }
  })
})

app.post('/SubscriptionMail', (req, res) => {

  let email = req.body.email

  console.log(email)
  let options = {
    from: 'info@atlasindia.co',
    to: 'info@atlasindia.co',
    subject: 'Subscription  Mail',
    html: `
    <h3>
    Email : ${email}<br/>
    </h3>`
  }
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error)
      res.status(500).send("couldn't send")
    } else {
      res.send('sent mail')
    }
  })
})

app.listen(4000, () => {
  console.log('started')
})
