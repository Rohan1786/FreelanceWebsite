var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//backend will going to procced it
var mongoose=require('mongoose');
var mongodb=require('mongodb')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session');
var nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
//nodemailer added here


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }, // 60 seconds for demonstration
  })
);

// Middleware to check session (example)
app.post('/accept-cookies', (req, res) => {
  res.cookie('cookieConsent', 'accepted', { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
  res.send({ message: 'Cookies accepted' });
});

app.post('/reject-cookies', (req, res) => {
  res.clearCookie('cookieConsent');
  res.send({ message: 'Cookies rejected' });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
