import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

export default async function mongo() {
  let db;

  try {
    db = await mongoClient.db("mywallet");
    return db;
  } catch (error) {
    console.log(error);
    return error;
  }
}
