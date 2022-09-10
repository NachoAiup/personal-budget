require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { errorConverterHandler, errorHandler } = require("./middlewares/errors");

const authRouter = require("./routes/auth/auth.routes");
const transactionsRouter = require("./routes/transactions");

const port = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/transactions", transactionsRouter);

app.use(errorConverterHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

module.exports = app;
