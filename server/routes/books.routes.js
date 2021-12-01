const {
  createBookInfo,
  getOneBookById,
  deleteBookById,
  updateBookById,
  getAllBooks,
  getBooksRCHomeScreen,
  getBooksRCUserScreen,
} = require("../controllers/books.controller");
const { validateJWT } = require("../middlewares/validate-jwt");

module.exports = (app) => {
  app.post("/api/book/create", validateJWT, createBookInfo);
  app.get("/api/books", validateJWT, getAllBooks);
  app.put("/api/book/update/:id", validateJWT, updateBookById);
  app.get("/api/book/:id", validateJWT, getOneBookById);
  app.delete("/api/book/delete/:id", validateJWT, deleteBookById);
  app.get("/api/books/homescreen/crs", getBooksRCHomeScreen);
  app.get("/api/books/user/crs", validateJWT, getBooksRCUserScreen);
};
