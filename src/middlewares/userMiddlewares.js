import bcrypt from "bcrypt";
import joi from "joi";
import mongo from "../db/db.js";

let db = await mongo();

const userDataSchema = joi.object({
  name: joi.string().alphanum().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  passwordConfirm: joi.ref("password"),
});

async function signUpMiddleware(req, res, next) {
  const userData = req.body;

  const [sameEmail] = await db
    .collection("users")
    .find({ email: userData.email })
    .toArray();

  if (sameEmail) {
    res.status(409).send("Email already in use");
    return;
  }

  const validation = userDataSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(422).send(errors);
    return;
  }

  res.locals.userData = userData;
  next();
}

async function loginMiddleware(req, res, next) {
  const user = await db.collection("users").findOne({ email: req.body.email });
  const passDecrypt = bcrypt.compareSync(req.body.password, user.password);

  if (user && passDecrypt) {
    next();
  } else {
    res.status(409).send("Invalid email or password");
    return;
  }
}

async function getUserMiddleware(req, res, next) {
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

export { signUpMiddleware, loginMiddleware, getUserMiddleware };
