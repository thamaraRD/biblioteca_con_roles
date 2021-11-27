const {
  createCR,
  getCRById,
  updateCRById,
  getAllCRbyBook,
} = require("../controllers/commentsRatings.controllers");
const { validateJWT } = require("../middlewares/validate-jwt");

module.exports = (app) => {
  app.post("/api/cr/create", validateJWT, createCR);
  app.get("/api/cr/:id", validateJWT, getCRById);
  app.get("/api/crs/:id", validateJWT, getAllCRbyBook);
  app.put("/api/cr/edit/:id", validateJWT, updateCRById);
};
