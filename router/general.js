const express = require('express');
const books = require("../booksdb.js");

const public_users = express.Router();


// Task 1 - Get all books
public_users.get('/', (req, res) => {
    return res.status(200).json(books);
});


// Task 2 - Get book by ISBN
public_users.get('/isbn/:isbn', (req, res) => {

    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    }

    return res.status(404).json({
        message: "Book not found"
    });

});


// Task 3 - Get books by author
public_users.get('/author/:author', (req, res) => {

    const author = req.params.author.toLowerCase();

    const filteredBooks = Object.values(books).filter(
        book => book.author.toLowerCase() === author
    );

    return res.status(200).json(filteredBooks);

});


// Task 4 - Get books by title
public_users.get('/title/:title', (req, res) => {

    const title = req.params.title.toLowerCase();

    const filteredBooks = Object.values(books).filter(
        book => book.title.toLowerCase() === title
    );

    return res.status(200).json(filteredBooks);

});


// Task 5 - Get book review
public_users.get('/review/:isbn', (req, res) => {

    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    }

    return res.status(404).json({
        message: "Book not found"
    });

});


// Task 10 - Get all books using async callback function
public_users.get('/asyncbooks', async function (req, res) {

    const getBooks = new Promise((resolve, reject) => {

        resolve(books);

    });

    const result = await getBooks;

    return res.status(200).json(result);

});


// Task 11 - Search by ISBN using Promises
public_users.get('/promise/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    const getBookByISBN = new Promise((resolve, reject) => {

        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }

    });

    getBookByISBN
        .then(book => {
            return res.status(200).json(book);
        })
        .catch(error => {
            return res.status(404).json({
                message: error
            });
        });

});


// Task 12 - Search by Author using async/await
public_users.get('/async/author/:author', async function (req, res) {

    const author = req.params.author.toLowerCase();

    const getBooksByAuthor = new Promise((resolve, reject) => {

        const filteredBooks = Object.values(books).filter(
            book => book.author.toLowerCase() === author
        );

        resolve(filteredBooks);

    });

    const result = await getBooksByAuthor;

    return res.status(200).json(result);

});


// Task 13 - Search by Title using async/await
public_users.get('/async/title/:title', async function (req, res) {

    const title = req.params.title.toLowerCase();

    const getBooksByTitle = new Promise((resolve, reject) => {

        const filteredBooks = Object.values(books).filter(
            book => book.title.toLowerCase() === title
        );

        resolve(filteredBooks);

    });

    const result = await getBooksByTitle;

    return res.status(200).json(result);

});


module.exports.general = public_users;