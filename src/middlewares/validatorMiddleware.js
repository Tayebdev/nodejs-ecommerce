const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  // Send 404 with the validation errors
  return res.status(404).json({
    status: "fail",
    errors: result.array(),
  });
};
