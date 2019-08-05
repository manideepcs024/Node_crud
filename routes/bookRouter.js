const express = require('express');

function routes(Book) {
    const bookRouter = express.Router();
    bookRouter.route('/books')
        .post((req, res) => {
            const book = new Book(req.body);
            console.log(book);
            book.save();
            return res.status(201).json(book);
        })
        .get((req, res) => {
            // const { query } = req;
            const query = {};
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            console.log("query recd. ", query);
            Book.find(query,
                (err, books) => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.json(books);

                }
            );
            const response = { hello: "Book Api" };
            // res.json(response);
        });
    bookRouter.use('/books/:bookID', (req, res, next) => {
        Book.findById(req.params.bookID, (err, book) => {
            if (err) {
                return res.send(err);
            } if (book) {
                req.book = book;
                return next();
            }
            return res.sendStatus(404);

        });
    });
    bookRouter.route('/books/:bookID')
        .get((req, res) => res.json(req.book))
        .put((req, res) => {
            const { book } = req;

            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save();
            return res.json(book);


        })
        .patch((req,res) =>{
            const { book } = req;
            if(req.body._id){
                delete req.body._id;
            }
            Object.entries(req.body).forEach((item)=>{
                const key = item [0];
                const value = item [1];
                book[key]= value;

            });
            req.book.save((err)=>{
                if(err){
                    return res.err;
                }else{
                    return res.json(book);
                }
            });
        }).delete((req,res)=>{
            req.book.remove((err)=>{
                if(err){
                   return res.send(err);
                }
                return res.sendStatus(204);
            });
        });

return bookRouter;
}

module.exports = routes;