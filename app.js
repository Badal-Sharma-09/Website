const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const bodyParser = require('body-parser');
require('./db/connect');
const Register = require('./modeles/register');
const Contact = require('./modeles/contact');
const login = require("./modeles/login");
passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

//Endpoints related stuff

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//=====================
// ROUTES
//=====================

//Showing Home Page
app.get('/', function (req, res) {
  res.sendFile("index.html");
});
app.get('*', (req, res) => {
  res.send('<h1>Oops page not found!</h1>')
});

// Serving data to Database

//Handaling user signup
app.post("/register", (req, res, next) => {
  data = req.body;
  Register.create(data, (err, user) => {
    if (err) return next(err);
    res.redirect('index.html');
  });
});

app.post("/contact", (req, res) => {
  var contactuser = new Contact(req.body);
  contactuser.save()
    .then(item => {
      res.send("data saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// //Handling user login
app.post('/login', async (req, res) => {
try {
  const email = req.body.email;
  const Password = req.body.Password
const useremail = await Register.findOne({email:email});

if (useremail.Password === Password) {
  res.status(200).render('index.html');
} else {
 res.send('invalid login detailes')
}
} catch (error) {
  res.status(400).send('invalid login detailes');
};


})

      // //Handling user logout 

      // Start server
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      });