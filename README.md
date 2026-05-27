# Online Book Review API

## Overview

This project is a RESTful Online Book Review API built using Node.js and Express.js.

## Features

- Get all books
- Search books by ISBN
- Search books by Author
- Search books by Title
- Get book reviews
- User Registration
- User Login with JWT Authentication
- Add/Modify Reviews
- Delete Reviews
- Async/Await and Promise-based methods

## Technologies Used

- Node.js
- Express.js
- JWT
- Axios
- Express Session
- REST API

## Installation

```bash
npm install
```

## Run Project

```bash
npm start
```

## Development Mode

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /books | Get all books |
| GET | /books/isbn/:isbn | Get book by ISBN |
| GET | /books/author/:author | Get books by author |
| GET | /books/title/:title | Get books by title |
| GET | /books/review/:isbn | Get reviews |
| POST | /customer/register | Register user |
| POST | /customer/login | Login user |
| PUT | /customer/review/:isbn | Add/Modify review |
| DELETE | /customer/review/:isbn | Delete review |

## Author

Ananda Saikia
```

---

# 9. Run the Project

```bash
npm install
npm start
```

Server runs at:

```bash
http://localhost:5000
```

---