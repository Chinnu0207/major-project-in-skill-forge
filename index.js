// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
var engine = require('express-handlebars').engine;

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views','./views');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname,'public')));

// GET route for the login form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// POST route to handle form submission
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Redirect the user to a new page after login
  res.render('welcome', { username, password });
});

// Route for the welcome page
app.get('/welcome', (req, res) => {
  res.send('Welcome!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
