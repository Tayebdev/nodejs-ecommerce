const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand is required"],
      unique: [true, "Brand must be unique"]
    },
    image: {
      type: String
    },
    slug: {
      type: String,
      lowercase: true
    }
  },
  {
    collection: "Brand",
    timestamps: true
  }
);

const BrandModel = mongoose.model("Brand", BrandSchema);
module.exports = BrandModel;
