import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Simple test routes
app.get('/users', (req, res) => {
    res.json({ message: 'Users endpoint working', users: [] });
});

app.post('/users/create', (req, res) => {
    res.json({ message: 'User created successfully', user: req.body });
});

app.get('/books', (req, res) => {
    res.json({ message: 'Books endpoint working', books: [] });
});

app.post('/books/create', (req, res) => {
    res.json({ message: 'Book created successfully', book: req.body });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});