const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone number is required"],
      minlength: [6, "Phone number is too short"],
    },
    street: {
      type: String,
      trim: true,
      required: [true, "Street address is required"],
    },
    postalCode: {
      type: String,
      trim: true,
      required: [true, "Postal code is required"],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      trim: true,
      required: [true, "State is required"],
    },
    country: {
      type: String,
      trim: true,
      required: [true, "Country is required"],
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "Address" }
);

const addressModel = mongoose.model("Address", addressSchema);
module.exports = addressModel;
