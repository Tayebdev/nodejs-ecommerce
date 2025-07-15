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

const getProductById = getOne(productModel);

const updateProduct = updateOne(productModel);

const deleteProduct = deleteOne(productModel);

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

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
