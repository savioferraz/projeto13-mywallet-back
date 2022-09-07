import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import joi from "joi";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db("mywallet");
});

server.post("/sign-up", async (req, res) => {
  try {
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

server.listen(5000, () => console.log("Listening on port 5000"));
