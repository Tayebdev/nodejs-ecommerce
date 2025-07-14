const { validationResult } = require('express-validator');


exports.runValidation =(req, res, next) => {
      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }
      res.send({ errors: result.array() });
    }