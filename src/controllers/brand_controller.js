const BrandModel = require("../models/brand_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const slugify = require("slugify");

const createBrand = asyncHandler(async (req, res) => {
  const Brand = new BrandModel({
    name: req.body.name,
    slug: slugify(req.body.name),
  });
  const savedBrand = await Brand.save();
  res.status(201).json({
    status: "success",
    data: savedBrand,
  });
});

const getBrandById = asyncHandler(async (req, res, next) => {
  const Brand = await BrandModel.findById((_id = req.params.id));
  if (!Brand || Brand.length === 0) {
    return next(new ErrorAPI("Brand not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: Brand,
  });
});

const getAllBrand = asyncHandler(async (req, res, next) => {
  const Brand = await BrandModel.find();
  if (!Brand || Brand.length === 0) {
    return next(new ErrorAPI("Brand not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: Brand,
  });
});

const updateBrand = asyncHandler(async (req, res, next) => {
  const Brand = await BrandModel.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, slug: slugify(req.body.name) },
    { new: true }
  );
  if (!Brand || Brand.length === 0) {
    return next(new ErrorAPI("No Brannd found"), 404);
  }
  res.status(200).json({
    status: "Brand is Updated",
    data: Brand,
  });
});

const deleteBrand = asyncHandler(async (req, res, next) => {
  const Brand = await BrandModel.findOneAndDelete({ _id: req.params.id });
  if (!Brand || Brand.length === 0) {
    return next(new ErrorAPI("Brand not found"), 404);
  }
  res.status(200).json({
    status: "Brand is deleted",
    data: Brand,
  });
});

module.exports = {
  createBrand,
  getBrandById,
  getAllBrand,
  updateBrand,
  deleteBrand,
};
