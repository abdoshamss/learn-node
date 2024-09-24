const express = require("express");
const mongoose = require("mongoose");
const app = express();
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require("./routes/auth");
const logger = require("./middlewares/logger");
const { errorHandler, notFound } = require("./middlewares/errors");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/bookStoreDB")
    .then(() => console.log("Connected to mongodb"))
    .catch((error) => console.log("Connection failed to mongodb\n", error));

app.use(express.json());
app.use(logger);

app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/auth", authPath);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 500;
console.log(`*****>>>>>>>>>>${process.env.PORT}`);
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV||"development"} mode on port ${PORT}`));
