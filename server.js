const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('./config/passportConfig');
const session = require('express-session');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const request = require('request');
require('dotenv').config();
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(helmet());

const sessionStore = new SequelizeStore({
  db: db.sequelize, 
  expiration: 30 * 60 * 1000
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

// Use this line once to set up the store table
// sessionStore.sync();

// This must come after the session and before passport
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/search', function(req, res) {
  // render form for search
});

app.get('/results', function(req,res) {
  // let apiUrl = `https://api.careeronestop.org/v1/jobsearch/${process .env.userid}/${req.query.keyword}/${req.query.location}/25/30/0/asc/1/20`
  let apiUrl = `https://api.careeronestop.org/v1/jobsearch/${process.env.userid}/web%20developer/seattle%2C%20wa/25/30/0/0/1/20`
  console.log(apiUrl)
  request({
    url: apiUrl,
    headers: {
      'Authorization': 'Bearer ' + process.env.APIToken,
      'Content-Type': 'application/json' 
    }
  }, function(error, response, body) {
    console.log("Error", error);
    // console.log(response);
    res.json(JSON.parse(body))
    // let jobs = JSON.parse(body).jobsearch.v1.
    // {userId}/{keyword}/{location}/{radius}/{sortColumns}/{sortOrder}/{startRecord}/{pageSize}/{days}; 
    // res.render('/results', {keyword,location});
  // route that get hit by form on /search
  // use req.query with parameters from form
  // use request() to hit api
  // request takes an object 
    });
  });  

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);
// console.log('Enviroment variables: ', process.env);

module.exports = server;