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
    const crById = await CommentRating.find({
      user: data.user,
      book: data.book,
    });
    if (crById.length > 0) {
      return res.status(403).json({ error: "Usuario ya comentó este libro" });
    } else {
      const createCR = await CommentRating.create(data);
      return res.json(createCR);
    }
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
//Todos los comentarios/rating de los libros
module.exports.getAllCRByBook = async (req, res) => {
  try {
    const crById = await CommentRating.find({ book: req.params.id }).populate(
      "user",
      "firstName"
    );
    // console.log("size object", Object.keys(crById).length);
    if (Object.keys(crById).length === 0) {
      return res.json({ avgRating: 0, comments: [], book: req.params.id });
    } else {
      const data = {
        avgRating:
          crById.map((ele) => ele.rating).reduce((prev, acc) => prev + acc) /
          crById.length,
        comments: crById,
        book: req.params.id,
      };
      return res.json(data);
    }
  } catch (err) {
    return res.status(500).json({
      error: err,
      msg: "error al traerse los comentarios por el id del libro",
    });
  }
};
