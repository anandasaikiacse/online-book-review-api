const express = require('express');
const books = require('../booksdb');

const public_users = express.Router();

// Task 1 - Get all books
public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

// Task 2 - Get books by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.json(books[isbn]);
  }

  return res.status(404).json({
    message: 'Book not found'
  });
});

// Task 3 - Get books by Author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();

  const filteredBooks = Object.values(books).filter(
    book => book.author.toLowerCase() === author
  );

  return res.json(filteredBooks);
});

// Task 4 - Get books by Title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();

  const filteredBooks = Object.values(books).filter(
    book => book.title.toLowerCase() === title
  );

  return res.json(filteredBooks);
});

// Task 5 - Get book review
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.json(books[isbn].reviews);
  }

  return res.status(404).json({
    message: 'Book not found'
  });
});

module.exports.general = public_users;