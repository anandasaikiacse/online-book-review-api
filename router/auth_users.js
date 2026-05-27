const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('../booksdb');
const { authenticateToken, SECRET } = require('../middleware/auth');

const regd_users = express.Router();

let users = [];

// Task 6 - Register user
regd_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(user => user.username === username);

  if (userExists) {
    return res.status(400).json({
      message: 'User already exists'
    });
  }

  users.push({ username, password });

  return res.status(201).json({
    message: 'User registered successfully'
  });
});

// Task 7 - Login user
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }

  const token = jwt.sign({ username }, SECRET, {
    expiresIn: '1h'
  });

  return res.json({
    message: 'Login successful',
    token
  });
});

// Task 8 - Add/Modify review
regd_users.put('/review/:isbn', authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.user.username;

  if (!books[isbn]) {
    return res.status(404).json({
      message: 'Book not found'
    });
  }

  books[isbn].reviews[username] = review;

  return res.json({
    message: 'Review added/updated successfully'
  });
});

// Task 9 - Delete review
regd_users.delete('/review/:isbn', authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  if (!books[isbn]) {
    return res.status(404).json({
      message: 'Book not found'
    });
  }

  delete books[isbn].reviews[username];

  return res.json({
    message: 'Review deleted successfully'
  });
});

module.exports.authenticated = regd_users;