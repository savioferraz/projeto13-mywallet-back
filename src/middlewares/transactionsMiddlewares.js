import mongo from "../db/db.js";
import joi from "joi";

let db = await mongo();

const transactionSchema = joi.object({
  amount: joi.number().integer().required(),
  desc: joi.string().alphanum().required(),
});

async function getTransactionsMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send("token error");
    return;
  }

  const session = await db.collection("sessions").findOne({ token });
  if (!session) {
    res.status(401).send("seassion error");
    return;
  }

  const user = await db.collection("users").findOne({ email: session.email });
  if (user) {
    res.locals.user = user;
    next();
  } else {
    res.status(401).send("user error");
  }
}

async function postTransactionMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.sendStatus(401);
    return;
  }

  const session = await db.collection("sessions").findOne({ token });
  if (!session) {
    res.sendStatus(401);
    return;
  }

  const validation = transactionSchema.validate(req.body);
  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(422).send(errors);
    return;
  }

  const user = await db.collection("users").findOne({ email: session.email });
  if (user) {
    res.locals.user = user;
    next();
  } else {
    res.sendStatus(401);
  }
}

export { getTransactionsMiddleware, postTransactionMiddleware };
