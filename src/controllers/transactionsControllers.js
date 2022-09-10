import dayjs from "dayjs";
import mongo from "../db/db.js";

let db = await mongo();

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
      amount: req.body.amout,
      desc: req.body.desc,
      date: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
};

export { income, expense };
