const {
  createCR,
  getCRById,
  updateCRById,
  getAllCRByBook,
  getBookWhitCR,
} = require("../controllers/commentsRatings.controllers");
const { validateJWT } = require("../middlewares/validate-jwt");
const { authBasic } = require("../middlewares/authBasic");

module.exports = (app) => {
  app.post("/api/cr/create", validateJWT, authBasic, createCR);
  app.get("/api/cr/:id", validateJWT, authBasic, getCRById);
  app.put("/api/cr/edit/:id", validateJWT, authBasic, updateCRById);
  app.get("/api/cr/book/:id", validateJWT, authBasic, getAllCRByBook);
  app.get("/api/cr/book/user/:id", validateJWT, authBasic, getBookWhitCR);
};
