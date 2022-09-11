import cors from "cors";
import express from "express";
import userRouters from "./src/routers/userRouters.js";
import transactionsRouters from "./src/routers/transactionsRouters.js";

const server = express();
server.use(express.json());
server.use(cors());

server.use(userRouters);
server.use(transactionsRouters);

server.listen(5000, () => console.log("Listening on port 5000"));
