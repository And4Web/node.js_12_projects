const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//dynamic
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.get("/", (req, res)=>{
  res.render('index', {
    title: 'Pug'
  });
  // console.log(req.url);
})
app.get('/about', (req, res)=>{
  res.render('about')
})
app.get('/contact', (req, res)=>{
  res.render('contact')
})
app.post('/contact/send',async (req, res)=>{
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, 
    service: 'Gmail',
    // auth: {
    //   user: testAccount.user, // generated ethereal user
    //   pass: testAccount.pass, // generated ethereal password
    // },
    auth: {
      user: 'rajj.and001@gmail.com',
      pass: 'hgjgjhgjh'
    }
  });
  //send mail with defined transport object
  const mailOptions = {
    from: 'Anand Shukla <andpmedia1@gmail.com>',
    to: 'rajj.and001@gmail.com',
    subject: 'Hello this is test...',
    text: 'You have the submission with the following details: Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message,
    html: '<p>You have the submission with the following details:</p><ul><li>'+req.body.name+'</li><li>'+req.body.email+'</li><li>'+req.body.message+'</li></ul>'
  }
  await transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
      console.log(error);
      res.redirect('/');
    }else{
      console.log('Message has been sent: '+info.response);
    }
  })
  // console.log("sending test")
})

// Static
const static = path.join(__dirname, './public');
app.use(express.static(static));

app.get('/', (req, res)=>{
  res.send('Hello! This server is running...')
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  // console.log(path.join(__dirname, 'views'))
});