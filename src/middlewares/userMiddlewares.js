import joi from "joi";

const userDataSchema = joi.object({
  name: joi.string().alphanum().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  passwordConfirm: joi.ref("password"),
});

async function signUpMiddleware(req, res, next) {
  const userData = req.body;
  const validation = userDataSchema.validate(userData, { abortEarly: false });
  const [sameEmail] = await db
    .collection("users")
    .find({ email: userData.email })
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
  res.locals.userData = userData;
  next();
}

export { signUpMiddleware };
