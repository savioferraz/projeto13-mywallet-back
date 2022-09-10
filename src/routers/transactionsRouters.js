import express from "express";
import * as transactionsRouters from "../controllers/transactionsControllers.js";

const router = express.Router();

router.post("/transactions", transactionsRouters.income);
router.post("/transactions", transactionsRouters.expense);

export default router;
