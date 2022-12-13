require("dotenv").config();
const express = require('express')
const app = express()
const mongoose = require("mongoose");
var cors = require("cors");

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB.."));

app.use(cors());
app.use(express.json());

//setting routes
const userRouter = require("./routes/users");
app.use("/users", userRouter);

const postRouter = require("./routes/posts");
app.use("/posts", postRouter);

let PORT = process.env.PORT;
app.listen(PORT, ()=>console.log('Server started on port',PORT))