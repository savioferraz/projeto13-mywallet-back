import mongo from "../db/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

let db = await mongo();

const signUp = async (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  console.log(passwordHash);

  try {
    await db.collection("users").insertOne({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
};

const login = async (req, res) => {
  try {
    const token = uuid();

    await db.collection("sessions").insertOne({
      email: req.body.email,
      token,
    });
    res.status(200).send(token);
  } catch (error) {
    res.sendStatus(400);
  }
};

const getUser = async (req, res) => {
  try {
    const user = res.locals.user;
    const userName = await db
      .collection("users")
      .find({ email: user.email })
      .toArray();
    res.status(200).send(userName);
  } catch (error) {
    res.sendStatus(400);
  }
};

export { signUp, login, getUser };
