import express from "express";
import * as transactionsControllers from "../controllers/transactionsControllers.js";
import {
  getTransactionsMiddleware,
  postTransactionMiddleware,
} from "../middlewares/transactionsMiddlewares.js";

const router = express.Router();

router.get(
  "/transactions",
  getTransactionsMiddleware,
  transactionsControllers.transactions
);
router.post(
  "/incomes",
  postTransactionMiddleware,
  transactionsControllers.income
);
router.post(
  "/expenses",
  postTransactionMiddleware,
  transactionsControllers.expense
);

export default router;
