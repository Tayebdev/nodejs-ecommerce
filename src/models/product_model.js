const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short product description"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
    },
    priceAfterDiscount: {
      type: Number,
    },
    image:[String],
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a Category"],
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
      required: [true, "Product must belong to a SubCategory"],
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
      required: [true, "Product must belong to a Brand"],
    },
    ratingAverage: {
      type: Number,
      min: [1, "Rating must be above or equal to 1.0"],
      max: [5, "Rating must be below or equal to 5.0"],
      default: 1,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "Product",
  }
);

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
