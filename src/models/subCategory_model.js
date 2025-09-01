const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SubCategory name is required"],
      unique: [true, "SubCategory name must be unique"],
      minlength: [3, "Too short SubCategory name"],
      maxlength: [30, "Too long SubCategory name"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category reference is required"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "SubCategory",
  }
);
const subCategoryModel = mongoose.model("SubCategory", subCategorySchema);
module.exports = subCategoryModel;
