const { createBookInfo, getBookByUser, getOneBookById, deleteBookById, updateBookById, getAllBooks } = require("../controllers/books.controller");
const { validateJWT } = require("../middlewares/validate-jwt");

module.exports = (app) => {
app.post("/api/books/create", validateJWT, createBookInfo);
app.get('/api/books/user/:id', validateJWT, getBookByUser);
app.get('/api/books/', validateJWT, getAllBooks);
app.get('/api/book/:id', validateJWT, getOneBookById);
app.delete('/api/book/delete/:id', validateJWT, deleteBookById);
app.put('/api/book/update/:id', validateJWT, updateBookById);
};