const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
    collection: "Favorite",
  }
);

const favoriteModel = mongoose.model("Favorite", favoriteSchema);
module.exports = favoriteModel;
