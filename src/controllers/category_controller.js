const categoryModel = require("../models/category_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const {
  deleteOne,
  createOne,
  getOne,
  getAll,
  updateOne,
} = require("./Factory_Handler");

const CategoryModel = require("../models/category_model");

const createCategory = createOne(CategoryModel);

const getAllCategory = getAll(categoryModel);

const getCategoryById = getOne(categoryModel);

const updateCatgeory = updateOne(categoryModel);

const deleteCategory = deleteOne(categoryModel);

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

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  getCategoryByName,
  updateCatgeory,
  deleteCategory,
};
