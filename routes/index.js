var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bcrypt = require("bcrypt");
const { pool } = require("../dbConfig");
var bodyParser = require("body-parser");
var url = require("url");
const { https } = require("https");
// const url3 = url.parse("http://localhost:4200/smvv/recommendation");
const flash = require("express-flash");

// const passport = require("passport");

// const initializePassport = require('../passportConfig');
// initializePassport(passport);



// app.use(passport.initialize());
// app.use(passport.session());

// app.use(flash());

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.flag == 1){
    req.session.destroy();
    res.render('sign-up', { title: 'CodeLanguage', message : 'Email Already Exists' , flag : 1});
  }
  else if(req.session.flag == 2){
    req.session.destroy();
    res.render('login', { title: 'CodeLanguage', message : 'Registration Done. Please Login.', flag : 0});
  }
  else if(req.session.flag == 3){
    req.session.destroy();
    res.render('sign-up', { title: 'CodeLanguage', message : 'Confirm Password Does Not Match.', flag : 1});
  }
  else if(req.session.flag == 4){
    req.session.destroy();
    res.render('login', { title: 'CodeLanguage', message : 'Incorrect Email or Password.', flag : 1 });
  }
  else{
    res.render('index', { title: 'CodeLanguage' });
  }

});
//#TERMS
router.get("/terms&conditions", function (req, res, next) {
  res.render("terms&conditions", {
    title: "SMVV EDUTECH ADVISORY PVT LTD",
  });
});
//#POLICY
router.get("/policy", function (req, res, next) {
  res.render("policy", {
    title: "SMVV EDUTECH ADVISORY PVT LTD",
  });
});
//#REFUND_POLICY
router.get("/refund-policy", function (req, res, next) {
  res.render("refund-policy", {
    title: "SMVV EDUTECH ADVISORY PVT LTD",
  });
});
//#LOGIN
router.get("/login", function (req, res, next) {
  res.render("login", {
    title: "SMVV EDUTECH ADVISORY PVT LTD",
  });
});

router.post("/auth_login", function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  var psql = "select * from users where email = $1;";

  pool.query(psql, [email], function (err, result, fields) {
    if (err) throw err;
console.log(result.rows[0].password);
if (password == (result.rows[0].password)) {
      req.session.email = email;
      if (email == "admin.smvv@gmail.com") {
        res.redirect("https://smvv-admin.herokuapp.com/advisory");
        
      } else {
        res.redirect("https://smvv-admin.herokuapp.com/recommendation");
        
      }
    } else {
      console.log("im here2");
      req.session.flag = 4;
      res.redirect('/');
      // console.error("user not found");
    }
  });
});

// router.post("/auth_login", passport.authenticate("local", {
//   successRedirect: "http://localhost:4200/smvv/recommendation",
//   failureRedirect: "login",
//   failureFlash: true
// }))


//Route For Home Page
router.get("/index", function (req, res, next) {
  res.render("index", { message: "Welcome, " + req.body.email });
});

router.get("/logout", function (req, res, next) {
  if (req.session.email) {
    req.session.destroy();
    res.redirect("/");
  }
});

//#SignUp

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", {
    title: "SMVV EDUTECH ADVISORY PVT LTD",
  });
});

router.post("/auth_reg", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var contactNumber = req.body.contactNumber;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  let errors = [];
  if(!name || !email || !contactNumber || !password || !cpassword){
    errors.push({message: "Please Enter All Fields"});
  }

  if (cpassword == password) {
    var psql = "select * from users where email = $1;";

    pool.query(psql, [email], function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        req.session.flag = 1;
        res.redirect("/");
      } else {
        var hashpassword = bcrypt.hashSync(password, 10);
        var psql =
          "insert into users(name,email,contactNumber,password) values($1,$2,$3,$4);";

        pool.query(
          psql,
          [name, email, contactNumber, hashpassword],
           (err, result, fields) => {
            if (err) throw err;
            req.session.flag = 2;
            res.redirect("/login");
          }
        );
      }
    });
  } else {
    req.session.flag = 3;
    res.redirect("/");
  }

  if(errors.length > 0){
    res.render('sign-up', {errors});
  }
});



module.exports = router;
