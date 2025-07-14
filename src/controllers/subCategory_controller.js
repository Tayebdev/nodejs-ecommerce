const subCategoryModel = require("../models/subCategory_model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const { status } = require("migrate-mongo");

const createSubCategory = asyncHandler(async (req, res) => {
  const SubCategory = new subCategoryModel({
    name: req.body.name,
    slug: slugify(req.body.name),
    category: req.body.category,
  });
  console.log(SubCategory);
  const savedSubCategory = await SubCategory.save();
  res.status(201).json({
    status: "success",
    data: savedSubCategory,
  });
});

const getAllSubCategory = asyncHandler(async (req, res, next) => {
  const SubCategory = await subCategoryModel
    .find()
    // .populate({ path: "category", select: "name -_id" });
  if (!SubCategory) {
    return next(new ErrorAPI("not found SubCategory", 404));
  }
  res.status(200).json({
    result: SubCategory.length,
    status: "success",
    data: SubCategory,
  });
});

const getSubCategoryById = asyncHandler(async (req, res, next) => {
  const SubCategory = await subCategoryModel
    .findById(req.params.id)
    // .populate({ path: "category", select: "name -_id" });
  if (!SubCategory) {
    return next(new ErrorAPI("not found SubCategory", 404));
  }
  res.status(200).json({
    status: "success",
    data: SubCategory,
  });
});

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

const updateSubCategory = asyncHandler(async (req, res, next) => {
  const updateData = {
    category: req.body.category,
  };
  if (req.body.name) {
    updateData.name = req.body.name;
    updateData.slug = slugify(req.body.name);
  }
  const SubCategory = await subCategoryModel.findOneAndUpdate(
    { _id: req.params.id },
    updateData,
    { new: true }
  );
  if (!SubCategory) {
    return next(new ErrorAPI("No SubCategory found", 404));
  }
  res.status(200).json({
    status: "SubCategory is updated",
    data: SubCategory,
  });
});

const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const SubCategory = await subCategoryModel.findOneAndDelete({
    _id: req.params.id,
  });
  if (!SubCategory) {
    return next(new ErrorAPI("No SubCategory found", 404));
  }
  res.status(200).json({
    status: "SubCategory is deleted",
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
