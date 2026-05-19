import express from "express";

import protect from "../middleware/authMiddleware.js";

import validate from "../middleware/validationMiddleware.js";

import {
  createTransactionValidation,
} from "../validations/transactionValidation.js";

import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction APIs
 */


/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Transaction created successfully
 */

// CREATE TRANSACTION
router.post(
  "/",
  protect,
  createTransactionValidation,
  validate,
  createTransaction
);


/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions fetched successfully
 */

// GET ALL TRANSACTIONS
router.get(
  "/",
  protect,
  getTransactions
);


// GET SINGLE TRANSACTION
router.get(
  "/:id",
  protect,
  getTransactionById
);


// UPDATE TRANSACTION
router.put(
  "/:id",
  protect,
  updateTransaction
);


// DELETE TRANSACTION
router.delete(
  "/:id",
  protect,
  deleteTransaction
);

export default router;