import express from "express";

import protect from "../middleware/authMiddleware.js";

import validate from "../middleware/validationMiddleware.js";

import {
  createCategoryValidation,
} from "../validations/categoryValidation.js";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category APIs
 */


// CREATE CATEGORY
router.post(
  "/",
  protect,
  createCategoryValidation,
  validate,
  createCategory
);


// GET ALL CATEGORIES
router.get(
  "/",
  protect,
  getCategories
);


// UPDATE CATEGORY
router.put(
  "/:id",
  protect,
  updateCategory
);


// DELETE CATEGORY
router.delete(
  "/:id",
  protect,
  deleteCategory
);

export default router;