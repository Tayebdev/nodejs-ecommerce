const productModel = require("../models/product_model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");

const createProduct = asyncHandler(async (req, res) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const Product = new productModel(req.body);
  const savedProduct = await Product.save();
  res.status(201).json({
    status: "success",
    data: savedProduct,
  });
});
// Pagination
const getAllProduct = asyncHandler(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;
  const Product = await productModel
    .find()
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "subCategory", select: "name -_id" })
    .populate({ path: "brand", select: "name -_id" });
  if (!Product || Product.length === 0) {
    return next(new ErrorAPI("No Product found", 404));
  }
  res.status(200).json({
    result: Product.length,
    status: "success",
    data: Product,
  });
});
const getProductById = asyncHandler(async (req, res, next) => {
  const Product = await productModel.findOne({ _id: req.params.id });
  if (!Product) {
    return next(new ErrorAPI("No Product found", 404));
  }
  res.status(200).json({
    status: "success",
    data: Product,
  });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const Product = await productModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!Product || Product.length === 0) {
    return next(new ErrorAPI("No Product found", 404));
  }
  res.status(200).json({
    status: "Productis updated",
    data: Product,
  });
});
const deleteProduct = asyncHandler(async (req, res, next) => {
  const Product = await productModel.findOneAndDelete({
    _id: req.params.id,
  });
  if (!Product) {
    return next(new ErrorAPI("No Product found", 404));
  }
  res.status(200).json({
    status: "Product is deleted",
  });
});

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
