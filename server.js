const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('./config/passportConfig');
const session = require('express-session');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const request = require('request');
const methodOverride = require('method-override');
require('dotenv').config();
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const app = express();

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
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

// Use this line ONLY once to set up the store table
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
// GET / - renders home page
app.get('/', function(req, res) {
  res.render('index');
});

// GET - renders user profile page
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/main', require('./controllers/main'));
app.use('/search', require('./controllers/search'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;