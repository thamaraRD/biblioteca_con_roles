const Books = require("../models/books.model");

//Crear la info del libro [admin]
module.exports.createBookInfo = async (req, res) => {
  try {
    const create = await Books.create(req.body);
    return res.json(create);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
//Traerse todos los libros ingresados por el User [¡Pendiente x revisar!]
module.exports.getBookByUser = async (req, res) => {
  try {
    const bookUser = await Books.find({ author: req.params.id });
    return res.json(bookUser);
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, msg: "error al traerse los libros por el User" });
  }
};
//Traerse un libro By ID [Admin- Basic]
module.exports.getOneBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById({ _id: id });
    return res.json(book);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
//Borrar libro by ID
module.exports.deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Books.deleteOne({ _id: id });
    return res.json({
      message: "Se ha borrado el libro exítosamente",
      task: deletedBook,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
//Actualizar libro by ID
module.exports.updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedBook = await Books.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    return res.json({
      message: "Se actualizó el libro correctamente",
      updatedBook,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
//Traerse todos los libros
module.exports.getAllBooks = async (_, res) => {
  try {
    const books = await Books.find();
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
//Libros con comentarios y ratings
module.exports.getBooksRC = async (_, res) => {
  try {
    const books = await Books.aggregate([
      {
        $lookup: {
          from: "commentratings",
          localField: "_id",
          foreignField: "book",
          as: "comments",
        },
      },
      {
        $unwind: {
          path: "$comments",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: {
            $last: "$title",
          },
          author: {
            $last: "$author",
          },
          imgUrl: {
            $last: "$bookImageUrl",
          },
          avgRating: {
            $avg: "$comments.rating",
          },
        },
      },
      {
        $lookup: {
          from: "commentratings",
          localField: "_id",
          foreignField: "book",
          as: "comments",
        },
      },
      {
        $sort: {
          avgRating: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
