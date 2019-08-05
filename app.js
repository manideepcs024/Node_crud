const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');



const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);
app.get('/', (req, res) => {
    res.send('Welcome to my NodeMonPI');
});

app.listen(port, () => {
    console.log(`Running on Port ${port}`);
});
