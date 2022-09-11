import mongo from "../db/db.js";
import bcrypt from "bcrypt";

let db = await mongo();

const signUp = async (req, res) => {
  console.log(userData);
  const passwordHash = bcrypt.hashSync(userData.senha, 10);

  try {
    await db.collection("users").insertOne({
      name: userData.name,
      email: userData.email,
      password: passwordHash,
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
};

const login = async (req, res) => {
  try {
    await db
      .collection("users")
      .findOne({ email: loginData.email, password: loginData.password });
  } catch (error) {
    res.sendStatus(400);
  }
};

export { signUp, login };
