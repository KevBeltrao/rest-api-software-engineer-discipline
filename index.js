const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.json());

const books = [];

const getBookById = (id) => books.find((book) => book.id === id);
const getBookIndexById = (id) => books.findIndex((book) => book.id === id);

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!(title && author)) {
    return res.status(400).json('Missing fields');
  }

  const newBook = {
    id: uuid(),
    title,
    author,
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = getBookById(id);

  if (!book) {
    return res.status(404).json('Book not found');
  }
  
  res.json(book);
});

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = getBookById(id);

  if (!book) {
    return res.status(404).json('Book not found');
  }

  const { title, author } = req.body;
  
  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const bookIndex = getBookIndexById(id);

  if (bookIndex === -1) {
    return res.status(404).json('Book not found');
  }
  books.splice(bookIndex, 1);
  
  res.json('Deleted successfully');
});

app.listen(3000);
