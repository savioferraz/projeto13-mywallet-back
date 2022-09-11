import dayjs from "dayjs";
import mongo from "../db/db.js";

let db = await mongo();

const transactions = async (req, res) => {
  try {
    await db.collection("transactions").find({ email: req.body.email });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};

const income = async (req, res) => {
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
};

const expense = async (req, res) => {
  try {
    await db.collection("transactions").insertOne({
      email: req.body.email,
      type: "expense",
      amount: req.body.amount * -1,
      desc: req.body.desc,
      date: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
};

export { income, expense, transactions };
