import { MongoClient, ServerDescription } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import joi from "joi";
import dayjs from "dayjs";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db("mywallet");
});

const userDataSchema = joi.object({
  name: joi.string().alphanum().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  passwordConfirm: joi.ref("password"),
});

server.post("/sign-up", async (req, res) => {
  try {
    const validation = userDataSchema.validate(req.body, { abortEarly: false });
    const [sameEmail] = await db
      .collection("users")
      .find({ email: req.body.email })
      .toArray();

    if (sameEmail) {
      res.status(409).send("Email already in use");
      return;
    }
    if (validation.error) {
      const errors = validation.error.details.map((error) => error.message);
      res.status(422).send(errors);
      return;
    }
    await db.collection("users").insertOne({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
});

server.post("/incomes", async (req, res) => {
  try {
    await db.collection("transactions").insertOne({
      email: req.body.email,
      type: "income",
      amount: req.body.amount,
      desc: req.body.desc,
      date: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
});

server.post("/expenses", async (req, res) => {
  try {
    await db.collection("transactions").insertOne({
      email: req.body.email,
      type: "expense",
      amount: req.body.amout,
      desc: req.body.desc,
      date: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
});

server.listen(5000, () => console.log("Listening on port 5000"));
