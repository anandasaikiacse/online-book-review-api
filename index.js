const express = require('express');
const session = require('express-session');
const cors = require('cors');
const axios = require('axios');

const public_routes = require('./router/general').general;
const auth_routes = require('./router/auth_users').authenticated;

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: 'fingerprint_customer',
    resave: true,
    saveUninitialized: true
  })
);

app.use('/books', public_routes);
app.use('/customer', auth_routes);

// Task 10 - Async callback function
function getAllBooks(callback) {
  setTimeout(() => {
    callback(null, 'All books fetched successfully');
  }, 1000);
}

getAllBooks((err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

// Task 11 - Search by ISBN using Promise
function searchByISBN(isbn) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:5000/books/isbn/${isbn}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

// Task 12 - Search by Author
async function searchByAuthor(author) {
  try {
    const response = await axios.get(
      `http://localhost:5000/books/author/${author}`
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

// Task 13 - Search by Title
async function searchByTitle(title) {
  try {
    const response = await axios.get(
      `http://localhost:5000/books/title/${title}`
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});