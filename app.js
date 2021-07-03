var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require('nodemailer');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const methodOverride = require("method-override");
var html = require('express-handlebars');
const session = require('express-session');
var app = express();
const flash = require("express-flash");
const passport = require("passport");

// const initializePassport = require('./passportConfig');
// initializePassport(passport);


app.use(session({
  secret : 'ABCDefg',
  resave : false,
  saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Layout Page
var path = __dirname + '/views';
app.engine('html', html({
  extname: 'html',
  defaultLayout: 'layout',
  layoutsDir: path
}));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// Method override middleware
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

// contactus post route
app.post("/send", (req, res) => {
  const output = `
  <p> You have new contact request </p>
  <h1> Contact details </h1>
  <ul>
     <li> Name : ${req.body.name} </li>
     <li> Email : ${req.body.email} </li>
     <li> Contact Number : ${req.body.contactNumber} </li>
  </ul>
  <h2> message </h2>
  <p2> ${req.body.message} </p2>`;

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "smvv@designway@gmail.com",
      pass: "Smvv@123",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '"SMVV" <smvv@designway@gmail.com>',
    to: "contact@smvvedutech.com", //whom u want send, list of reciever
    subject: "Query",
    text: "Hello SMVV",
    html: output,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }

    console.log("Message sent : %s", info);
    console.log("Preveiw URL : %s", nodemailer.getTestMessageUrl(info));

    // res.render("contactUs", { msg: "Email has been sent" });
  });
});


// joinus post route
app.post("/joinus", (req, res) => {
  const output = `
  <p> You have new JoinUs request </p>
  <h1> JoinUs details </h1>
  <ul>
     <li> Name : ${req.body.joinName} </li>
     <li> Email : ${req.body.joinEmail} </li>
     <li> Contact Number : ${req.body.joinContactNumber} </li>
  </ul>
  <h2> message </h2>
  <p2> ${req.body.joinMessage} </p2>
  <h2> Attachment </h2>
  <p2> ${req.body.joinFile} </p2>`;

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "smvv@designway@gmail.com",
      pass: "Smvv@123",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '"SMVV" <smvv@designway@gmail.com>',
    to: "smvv@designway@gmail.com", //whom u want send, list of reciever
    subject: "Query",
    text: "Hello SMVV",
    html: output,
    attachments: [
      {
          
      }
  ]
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }

    console.log("Message sent : %s", info);
    console.log("Preveiw URL : %s", nodemailer.getTestMessageUrl(info));

    // res.render("contactUs", { msg: "Email has been sent" });
  });
});


module.exports = app;
