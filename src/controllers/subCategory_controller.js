const subCategoryModel = require("../models/subCategory_model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const {
  deleteOne,
  createOne,
  getOne,
  getAll,
  updateOne,
} = require("./Factory_Handler");

const createSubCategory = createOne(subCategoryModel);

const getAllSubCategory = getAll(subCategoryModel);

const getSubCategoryById = getOne(subCategoryModel);

const updateSubCategory = updateOne(subCategoryModel);

const deleteSubCategory = deleteOne(subCategoryModel);

const getSubCategoryByCategoryId = asyncHandler(async (req, res, next) => {
  const SubCategory = await subCategoryModel.find({
    category: req.params.category,
  });
  if (!SubCategory) {
    return next(new ErrorAPI("Not found SubCategory"));
  }
  res.status(200).json({
    status: "success",
    data: SubCategory,
  });
});

module.exports = {
  createSubCategory,
  getAllSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryById,
  getSubCategoryByCategoryId,
};
