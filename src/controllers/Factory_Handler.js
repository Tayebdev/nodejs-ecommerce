const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const calculateDiscountedPrice = require("../utils/function");

const deleteOne = (model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await model.findOneAndDelete({ _id: req.params.id });
    if (!doc || doc.length === 0) {
      return next(new ErrorAPI(`${model.modelName}`), 404);
    }
    res.status(200).json({
      status: "Success",
      message: `${model.modelName} is deleted`,
      data: doc,
    });
  });
};

const createOne = (model) => {
  return asyncHandler(async (req, res) => {
    // Handle images and colors
    if (req.files && req.files.length > 0) {
      // Ensure colors is always an array
      const colors = Array.isArray(req.body.colors)
        ? req.body.colors
        : req.body.colors
        ? [req.body.colors]
        : [];

      req.body.images = req.files.map((file, index) => ({
        color: colors[index] || "default",
        image: file.filename,
      }));
    } else if (req.file) {
      req.body.images = [
        {
          color: req.body.colors || "default",
          image: req.file.filename,
        },
      ];
    }

    // Calculate priceAfterDiscount if price & sold exist
    if (req.body.price && req.body.sold) {
      const price = Number(req.body.price);
      const sold = Number(req.body.sold);

      if (!isNaN(price) && !isNaN(sold)) {
        req.body.priceAfterDiscount = calculateDiscountedPrice(price, sold);
      }
    }

    // Save the document
    const doc = new model(req.body);
    const savedDoc = await doc.save();

    res.status(201).json({
      status: "success",
      data: savedDoc,
    });
  });
};

const getOne = (model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await model.findById(req.params.id).sort({ name: 1 });
    if (!doc || doc.length === 0) {
      return next(new ErrorAPI(`Not ${model.modelName} found`, 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

const getAll = (model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await model.find().sort({ name: 1 });
    if (!doc || doc.length === 0) {
      return next(new ErrorAPI(`not found ${model.modelName}`, 404));
    }
    res.status(200).json({
      result: doc.length,
      status: "success",
      data: doc,
    });
  });
};

const updateOne = (model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await model.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!doc || doc.length === 0) {
      return next(new ErrorAPI(`No ${doc.modelName} Found`, 404));
    }
    res.status(200).json({
      status: `success`,
      message: `${model.modelName} is Updated`,
      data: doc,
    });
  });
};

module.exports = {
  deleteOne,
  createOne,
  getOne,
  getAll,
  updateOne,
};
