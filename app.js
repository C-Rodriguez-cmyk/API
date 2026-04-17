const express = require('express')
const app = express();
const port = 3000;
app.use(express.json());
let books = [
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
    { id: 2, title: 'Don Quijote', author: 'Miguel de Cervantes' }
];

app.get('/', (req, res) => {
    res.send('API working');
});

app.get('/api/books', (req, res) => {
    res.json(books);
});




//obtene run libro por id
app.get('/api/books/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});




//crear un nuevo libro
app.post('/api/books', (req, res) => {

    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({
            message: 'Datos obligatorios'
        });
    }

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author
    };

    books.push(newBook);

    res.status(201).json(newBook);

});

app.put('/api/books/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'No encontrado'
        });
    }

    book.title = title;
    book.author = author;

    res.json(book);
});

app.delete('/api/books/:id', (req, res) =>{

    const id = parseInt(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'NO Encontrado'
        });
    }

    books.splice(index, 1);

    res.json({
        message: 'Eliminado'
    });
});



app.get('/', (req, res) => {
    res.send('Hello pitti!');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


