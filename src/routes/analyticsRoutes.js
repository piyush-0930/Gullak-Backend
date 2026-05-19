import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getAnalytics,
  getCategoryBreakdown,
  getMonthlySummary,
} from "../controllers/analyticsController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics APIs
 */


// OVERALL ANALYTICS
router.get(
  "/overview",
  protect,
  getAnalytics
);


// CATEGORY BREAKDOWN
router.get(
  "/categories",
  protect,
  getCategoryBreakdown
);


// MONTHLY SUMMARY
router.get(
  "/monthly",
  protect,
  getMonthlySummary
);

export default router;