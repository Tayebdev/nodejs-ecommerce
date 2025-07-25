const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "User name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,
      required: [true, "User password is required"],
      minlength: [8, "Too short password"],
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
  },
  { timestamps: true, collection: "User" }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
