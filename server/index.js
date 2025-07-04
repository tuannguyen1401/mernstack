import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const PORT      = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
    .connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/api", userRoute);
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true      // nếu gửi kèm cookie/token
  }));

