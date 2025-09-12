const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");
const ErrorAPI = require("./utils/ErrorAPI");
const GlobalError = require("./middlewares/globalError");
const path = require("path");

const categoryRouter = require("./routes/category_route");
const SubCategoryRouter = require("./routes/subCategory_route");
const brandRouter = require("./routes/brand_route");
const productRouter = require("./routes/product_route");
const userRouter = require("./routes/user_route");
const authRouter = require("./routes/auth_route");
const reviewRouter=require('./routes/review_route')

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));
app.use(express.json({ limit: "20kb" }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`✅ mode:${process.env.NODE_ENV}`);
}

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subCategory", SubCategoryRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/review", reviewRouter);

app.use((req, res, next) => {
  next(new ErrorAPI(`Can't find ${req.originalUrl} on the server`, 400));
});
app.use(GlobalError);

const { PORT } = process.env;
connectDB();
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
