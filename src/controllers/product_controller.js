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
  const productId = req.params.id;
  if (!productModel.db.base.Types.ObjectId.isValid(productId)) {
    return next(new ErrorAPI("Invalid product ID format", 400));
  }

  const product = await productModel
    .findById(productId)
    .populate({ path: "category", select: "name" })
    .populate({ path: "subCategory", select: "name" })
    .populate({ path: "brand", select: "name" });

  if (!product) {
    return next(
      new ErrorAPI(`No ${productModel.modelName} found for this ID`, 404)
    );
  }
  const response = {
    _id: product._id,
    title: product.title,
    description: product.description,
    quantity: product.quantity,
    sold: product.sold,
    price: product.price,
    priceAfterDiscount: product.priceAfterDiscount,
    images: product.images,
    sizes: product.sizes,
    ratingAverage: product.ratingAverage,
    quantityResidents: product.quantityResidents,
    category: product.category ? product.category.name : null,
    subCategory: product.subCategory ? product.subCategory.name : null,
    brand: product.brand ? product.brand.name : null,
  };
  res.status(200).json({
    status: "success",
    data: response,
  });
});

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
