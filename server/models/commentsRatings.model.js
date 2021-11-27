const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentsRatingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "ID del usuario es requerido"],
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: [true, "ID del book es requerido"],
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CommentRating = model("CommentRating", commentsRatingSchema);
module.exports = CommentRating;
