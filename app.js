const express=require("express");
const booksPath=require("./routes/books");
const authorsPath=require("./routes/authors");
const mongoose =require("mongoose");
const app=express();
const dotenv=require("dotenv");
dotenv.config();


mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/bookStoreDB")
.then(()=>console.log("Connected to mongodb"))
.catch((error)=>console.log("Connection failed to mongodb\n",error));

app.use(express.json());
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
});
app.use("/api/books",booksPath);
app.use("/api/authors",authorsPath);

const PORT =process.env.PORT || 500;
app.listen (PORT,()=>console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
