const categoryModel = require("../models/category_model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");

const createCategory = asyncHandler(async (req, res) => {
  const category = new categoryModel({
    name: req.body.name,
    slug: slugify(req.body.name),
  });
  const savedCategory = await category.save();
  res.status(201).json({
    status: "success",
    data: savedCategory,
  });
});
// Pagination
const getAllCategory = asyncHandler(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;
  const categories = await categoryModel.find().skip(skip).limit(limit);
  if (!categories || categories.length === 0) {
    return next(new ErrorAPI("No categories found", 404));
  }
  res.status(200).json({
    result: categories.length,
    status: "success",
    data: categories,
  });
});
const getCategoryById = asyncHandler(async (req, res, next) => {
  const categories = await categoryModel.findOne({ _id: req.params.id });
  if (!categories) {
    return next(new ErrorAPI("No categories found", 404));
  }
  res.status(200).json({
    status: "success",
    data: categories
  });
});

const getCategoryByName = asyncHandler(async (req, res, next) => {
  const categories = await categoryModel.findOne({ name: req.params.name });
  if (!categories) {
    return next(new ErrorAPI("No categories found", 404));
  }

  res.status(200).json({
    status: "success",
    data: categories,
  });
});

const updateCatgeory = asyncHandler(async (req, res, next) => {
  const categories = await categoryModel.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, slug: slugify(req.body.name) },
    { new: true }
  );
  if (!categories || categories.length === 0) {
    return next(new ErrorAPI("No categories found", 404));
  }
  res.status(200).json({
    status: "category is updated",
    data: categories,
  });
});
const deleteCategory = asyncHandler(async (req, res, next) => {
  const categories = await categoryModel.findOneAndDelete({
    _id: req.params.id,
  });
  if (!categories || categories.length === 0) {
    return next(new ErrorAPI("No categories found", 404));
  }
  res.status(200).json({
    status: "category is deleted",
    data: categories,
  });
});

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  getCategoryByName,
  updateCatgeory,
  deleteCategory,
};
