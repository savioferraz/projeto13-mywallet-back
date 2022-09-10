import cors from "cors";
import express from "express";
import joi from "joi";
import dayjs from "dayjs";
import mongo from "./src/db/db.js";
import userRoutes from "./src/routers/userRouters.js";
import transactionsRouters from "./src/routers/transactionsRouters.js";

let db = await mongo();

const server = express();
server.use(express.json());
server.use(cors());

const userDataSchema = joi.object({
  name: joi.string().alphanum().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  passwordConfirm: joi.ref("password"),
});

server.use(userRoutes);
server.use(transactionsRouters);

server.listen(5000, () => console.log("Listening on port 5000"));
