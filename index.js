import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connect } from "./utils/db.js";
import { route } from "./router/auth-router.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

connect();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api", route)

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hii from server home page");
});

app.listen(PORT, (req, res) => {
  console.log(`Server is connected at ${PORT}`);
});
