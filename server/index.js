import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postsRoute from "./routes/posts.js";
import userRoute from "./routes/user.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//https://github.com/expressjs/cors/blob/master/lib/index.js
app.use(cors());

app.use("/posts", postsRoute);
app.use("/user", userRoute);
app.use("/", (req, res) => {
  res.send("HEATH CHECK SUCCESSFULLY");
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 3001;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log("Server serving on " + PORT)))
  .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false);
