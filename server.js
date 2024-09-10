const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the signup page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Route for the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle signup form submissions
app.post('/signup', (req, res) => {
    const { username, password, name, gender, email } = req.body;
    const userData = `Name: ${name}, Gender: ${gender}, Email: ${email}, Username: ${username}, Password: ${password}\n`;

    // Append user data to the file
    fs.appendFile(path.join(__dirname, 'users.txt'), userData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error saving user data.');
        } else {
            res.send('Signup successful!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
