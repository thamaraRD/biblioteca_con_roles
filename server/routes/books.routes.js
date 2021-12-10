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
const { authAdmin } = require("../middlewares/authAdmin");
const { authBasic } = require("../middlewares/authBasic");

module.exports = (app) => {
  app.post("/api/book/create", validateJWT, authAdmin, createBookInfo);
  app.get("/api/books", validateJWT, authAdmin, getAllBooks);
  app.put("/api/book/update/:id", validateJWT, authAdmin, updateBookById);
  app.get("/api/book/:id", validateJWT, authAdmin, getOneBookById);
  app.delete("/api/book/delete/:id", validateJWT, authAdmin, deleteBookById);
  app.get("/api/books/homescreen/crs", getBooksRCHomeScreen);
  app.get("/api/books/user/crs", validateJWT, authBasic, getBooksRCUserScreen);
};
