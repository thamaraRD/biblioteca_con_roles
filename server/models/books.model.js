const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "ID del admin es requerido"],
    },
    author: {
      type: String,
      required: [true, "El libro requiere un autor"],
      minlength: [3, "El autor debe tener más de 3 caracteres"],
    },
    title: {
      type: String,
      required: [true, "Se requiere de un título"],
      minlength: [4, "El título debe tener más de 4 caracteres"],
    },
    year: {
      type: Number,
      required: [true, "Se requiere el año de publicación"],
    },
    publisher: {
      type: String,
      required: [true, "Se requiere el nombre de la editorial"],
    },
    subject: {
      type: String,
      required: [true, "Se requiere de un género literario"],
    },
    numberOfPages: {
      type: Number,
      required: [true, "Indique el numero de páginas del libro"],
    },
    bookImageUrl: {
      type: String,
    },
    comments: {
      type: [Object],
    },
    rating: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", BookSchema);
module.exports = Books;
