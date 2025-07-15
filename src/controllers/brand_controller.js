const BrandModel = require("../models/brand_model");
const { deleteOne, createOne, getOne, getAll,updateOne } = require("./Factory_Handler");


const createBrand = createOne(BrandModel);

const getBrandById = getOne(BrandModel);

const getAllBrand = getAll(BrandModel);

const updateBrand = updateOne(BrandModel);

const deleteBrand = deleteOne(BrandModel);

module.exports = {
  createBrand,
  getBrandById,
  getAllBrand,
  updateBrand,
  deleteBrand,
};
