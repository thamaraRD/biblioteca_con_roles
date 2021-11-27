const {
  createCR,
  getCRById,
  updateCRById,
  getAllCRByBook,
} = require("../controllers/commentsRatings.controllers");
const { validateJWT } = require("../middlewares/validate-jwt");

module.exports = (app) => {
  app.post("/api/cr/create", validateJWT, createCR);
  app.get("/api/cr/:id", validateJWT, getCRById);
  app.put("/api/cr/edit/:id", validateJWT, updateCRById);
  app.get("/api/cr/book/:id", validateJWT, getAllCRByBook);
};
