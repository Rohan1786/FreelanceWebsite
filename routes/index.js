var express = require('express');
var router = express.Router();
const User=require('./users');
const mongoose = require('mongoose');
const nodemailer=require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index');
});
router.get('/', function (req, res, next) {
  // Access session data
  res.render('index', { views: req.session.views });
});
router.get('/profile', async function(req, res, next) {
  try {
    // Find the user (adjust the query as per your need, here fetching the first user as an example)
    const user = await User.findOne(); // Change the query if you need a specific user

    if (!user) {
      // Handle the case when no user is found
      return res.status(404).send('User not found');
    }

    // Pass the user's name and email to the template
    res.render('profile', {
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    // Handle errors (e.g., database errors)
    console.error('Error fetching user:', error.message);
    // Send a 500 response with a detailed message
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});


router.get('/register', (req, res) => {
  res.render('register', { error: null }); // Initial render with no error message
});

// Handle form submission for user registration
router.post('/register', async (req, res) => {
  try {
    // Check if the user with the same name or email already exists
    const existingUser = await User.findOne({
      $or: [{ name: req.body.name }, { email: req.body.email }],
    });

    if (existingUser) {
      // Render the form with an error message
      return res.render('register', { error: 'A user with the same name or email already exists. Please try again.' });
    }

    // Create a new user instance
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the user to the database
    await newUser.save();

    // Redirect to the index page after successful registration
    return res.redirect('/'); // Redirects to the 'index' route
  } catch (error) {
    // Render the registration form with an error message
    res.render('register', { error: 'Error registering user: ' + error.message });
  }
});

//this one is login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });

    // Check if user exists and the password matches
    if (user && user.password === password) {
      // If login is successful, redirect to the index page
      return res.redirect('/');
    } else {
      // If login fails, render the login page with an error message
      res.render('login', { errorMessage: 'Invalid email or password. Please try again.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { errorMessage: 'An error occurred during login. Please try again later.' });
  }
});


router.get('/login', (req, res) => {
  // Render the login page with no error message initially
  res.render('login', { errorMessage: null });
});
//routes for different pages
router.get('/About',(req,res)=>{
  res.render('About')
})
router.get('/Shop',(req,res)=>{
  res.render('shop')
})
//contact gets handle by this one
router.get('/Contact',(req,res)=>{
  res.render('Contact')
});

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Set up Nodemailer transporter with your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like Outlook, Yahoo, etc.
    auth: {
      user: 'rp9522203@gmail.com', // Your email address
      pass: 'Rohan@1234', // Your email password or app-specific password
    },
  });

  // Set up the email options
  const mailOptions = {
    from: email, // Sender's email address
    to: process.env.EMAIL_USER, // Your receiving email address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.send('Thank you for contacting us! Your message has been sent.');
  } catch (error) {
    console.error('Error sending email:', error);
    res.send('There was an error sending your message. Please try again later.');
  }
});



//admin pages
router.get('/adminlogin',(req,res)=>{
  res.render('Admin/adminLogin')
})
module.exports = router;
