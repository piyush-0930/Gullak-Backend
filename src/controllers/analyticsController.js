import Transaction from "../models/Transaction.js";

import asyncHandler from "../utils/asyncHandler.js";


// GET OVERALL ANALYTICS
export const getAnalytics =
  asyncHandler(async (req, res) => {

    // FETCH USER TRANSACTIONS
    const transactions =
      await Transaction.find({
        user: req.user._id,
      });

    // TOTAL INCOME
    const totalIncome =
      transactions
        .filter(
          (t) => t.type === "income"
        )
        .reduce(
          (acc, item) =>
            acc + item.amount,
          0
        );

    // TOTAL EXPENSE
    const totalExpense =
      transactions
        .filter(
          (t) => t.type === "expense"
        )
        .reduce(
          (acc, item) =>
            acc + item.amount,
          0
        );

    // NET BALANCE
    const balance =
      totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance,
      },
    });
  });


// CATEGORY BREAKDOWN
export const getCategoryBreakdown =
  asyncHandler(async (req, res) => {

    const breakdown =
      await Transaction.aggregate([
        {
          $match: {
            user: req.user._id,
            type: "expense",
          },
        },

        {
          $group: {
            _id: "$category",

            totalAmount: {
              $sum: "$amount",
            },
          },
        },

        {
          $sort: {
            totalAmount: -1,
          },
        },
      ]);

    // TOTAL EXPENSE
    const totalExpense =
      breakdown.reduce(
        (acc, item) =>
          acc + item.totalAmount,
        0
      );

    // ADD PERCENTAGES
    const formattedBreakdown =
      breakdown.map((item) => ({
        category: item._id,

        amount: item.totalAmount,

        percentage:
          totalExpense === 0
            ? 0
            : (
                (item.totalAmount /
                  totalExpense) *
                100
              ).toFixed(2),
      }));

    res.status(200).json({
      success: true,
      data: formattedBreakdown,
    });
  });


// MONTHLY SUMMARY
export const getMonthlySummary =
  asyncHandler(async (req, res) => {

    const summary =
      await Transaction.aggregate([
        {
          $match: {
            user: req.user._id,
          },
        },

        {
          $group: {
            _id: {
              year: {
                $year: "$date",
              },

              month: {
                $month: "$date",
              },

              type: "$type",
            },

            total: {
              $sum: "$amount",
            },
          },
        },

        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

    // FORMAT DATA
    const monthlyData = {};

    summary.forEach((item) => {
      const key =
        `${item._id.year}-${item._id.month}`;

      if (!monthlyData[key]) {
        monthlyData[key] = {
          year: item._id.year,
          month: item._id.month,
          income: 0,
          expense: 0,
        };
      }

      monthlyData[key][item._id.type] =
        item.total;
    });

    res.status(200).json({
      success: true,
      data: Object.values(monthlyData),
    });
  });