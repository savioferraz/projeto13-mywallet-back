import mongo from "../db/db.js";

let db = await mongo();

const signUp = async (req, res) => {
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
};

export { signUp };
