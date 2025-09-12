const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      minlength: [3, "Too short review text"],
      maxlength: [500, "Too long review text"],
    },
    rating: {
      type: Number,
      min: [1, "Rating must be above or equal to 1.0"],
      max: [5, "Rating must be below or equal to 5.0"],
      required: [true, "Rating is required"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    responseReview: {
      type: String,
      trim: true,
    },
    dateResponseReview: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "Review",
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "firstName lastName image" });
  next();
});

const reviewModel = mongoose.model("Review", reviewSchema);
module.exports = reviewModel;
