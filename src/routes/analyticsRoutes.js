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


/**
 * @swagger
 * /api/analytics/overview:
 *   get:
 *     summary: Get overall analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics fetched successfully
 */

// OVERALL ANALYTICS
router.get(
  "/overview",
  protect,
  getAnalytics
);


/**
 * @swagger
 * /api/analytics/categories:
 *   get:
 *     summary: Get category breakdown analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category breakdown fetched successfully
 */

// CATEGORY BREAKDOWN
router.get(
  "/categories",
  protect,
  getCategoryBreakdown
);


/**
 * @swagger
 * /api/analytics/monthly:
 *   get:
 *     summary: Get monthly analytics summary
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly analytics fetched successfully
 */

// MONTHLY SUMMARY
router.get(
  "/monthly",
  protect,
  getMonthlySummary
);

export default router;