const CommentRating = require("../models/commentsRatings.model");

//Crear comentario y rating [admin]
module.exports.createCR = async (req, res) => {
  try {
    const data = {
      user: req.userId,
      book: req.body.bookId,
      rating: req.body.rating,
      comment: req.body.comment,
    };
    const createCR = await CommentRating.create(data);
    return res.json(createCR);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
//Traer los comentarios y el rating por su ID
module.exports.getCRById = async (req, res) => {
  try {
    const crById = await CommentRating.find({ _id: req.params.id }).populate(
      "user"
    );
    return res.json(crById);
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, msg: "error al traerse los comentarios por el id" });
  }
};
// Actualizar comentario y rating por ID
module.exports.updateCRById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedCR = await CommentRating.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    return res.json({
      message: "Se actualizó su rating/comentario correctamente",
      updatedCR,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, msg: "error al editar los comentarios por el id" });
  }
};
// //Traernos todos los comentarios y ratings por Id del libro
module.exports.getAllCRbyBook = async (req, res) => {
  try {
    const allCRdata = await CommentRating.find({ _id: req.params.id });
    return res.json(allCRdata);
  } catch (err) {
    return res.status(500).json({
      error: err,
      msg: "error al traernos todos los comentarios/rating por el id del libro",
    });
  }
};
