const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const BookSchema = new mongoose.Schema({
author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: [true, 'ID es requerido']
    },
title: {
        type: String,
        required: [true, 'Se requiere de un título'],
        minlength:[4, 'El título debe tener más de 4 caracteres']
    },
year: {
        type: Number,
        required: [true, "Se requiere el año de publicación"],
    },
editorial:{
        type: String,
        required: [true, 'Se requiere el nombre de la editorial']
    },
gender:{
        type: String,
        required: [true, 'Se requiere de un género literario']
    },
numberOfPages:{
        type: Number,
        required: [true, 'Indique el numero de páginas del libro']
    },
// bookImageUrl: {
//         type: String,
//         required: [true, 'La imagen del libro es requerida']
//     },
comments:{
        type: [Object]
    },
rating: {
        type: Array
    }

}, {timestamps: true});

const Books = mongoose.model("Books", BookSchema);
BookSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
module.exports = Books;
