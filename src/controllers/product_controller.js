const productModel = require("../models/product_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const {
  deleteOne,
  createOne,
  getOne,
  updateOne,
} = require("./Factory_Handler");

const createProduct = createOne(productModel);

const getProductById = asyncHandler(async (req, res, next) => {
  const Product = await productModel
    .findById(req.params.id)
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "subCategory", select: "name -_id" })
    .populate({ path: "brand", select: "name image -_id" });
  if (!Product || Product.length === 0) {
    return next(new ErrorAPI("No Product found", 404));
  }
  res.status(200).json({
    result: Product.length,
    status: "success",
    data: Product,
  });
});

const updateProduct = updateOne(productModel);

const deleteProduct = deleteOne(productModel);

// Pagination
const getAllProduct = asyncHandler(async (req, res, next) => {
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 4;
  // const skip = (page - 1) * limit;
  const Product = await productModel
    .find()
    // .skip(skip)
    // .limit(limit)
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "subCategory", select: "name -_id" })
    .populate({ path: "brand", select: "name image -_id" });
  if (!Product || Product.length === 0) {
    return next(new ErrorAPI("No Product found", 404));
  }
  res.status(200).json({
    result: Product.length,
    status: "success",
    data: Product,
  });
});

const getProductBySubCategoryId = asyncHandler(async (req, res, next) => {
  const doc = await productModel
    .find({ subCategory: req.params.subCategoryId })
  if (!doc || doc.length === 0) {
    return next(new ErrorAPI("No products found", 404));
  }
  res.status(200).json({
    status: "success",
    data: doc,
  });
});


module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductBySubCategoryId,
};
