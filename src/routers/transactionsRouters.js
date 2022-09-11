import express from "express";
import * as transactionsControllers from "../controllers/transactionsControllers.js";

const router = express.Router();

router.get("/transactions", transactionsControllers.transactions);
router.post("/transactions", transactionsControllers.income);
router.post("/transactions", transactionsControllers.expense);

export default router;
