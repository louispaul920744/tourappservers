import express from "express";
import { MongoClient } from 'mongodb'
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const url = 'mongodb+srv://lpaul4440:react@9562@tourapp.9nrhixd.mongodb.net/?retryWrites=true&w=majority';


// Database Name
const dbName = 'todo';
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(bodyParser.json());


app.use("/users", userRouter);
app.use("/tour", tourRouter);
app.get("/", (req, res) => {
  res.send("Welcome to tour API");
});

const port =  5000;

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));