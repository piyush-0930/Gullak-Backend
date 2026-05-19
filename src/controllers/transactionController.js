import Transaction from "../models/Transaction.js";

import asyncHandler from "../utils/asyncHandler.js";


// CREATE TRANSACTION
export const createTransaction = asyncHandler(
  async (req, res) => {
    const {
      type,
      amount,
      category,
      note,
      date,
    } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      note,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  }
);


// GET ALL TRANSACTIONS
export const getTransactions = asyncHandler(
  async (req, res) => {
    const {
      type,
      category,
      startDate,
      endDate,
      sortBy = "date",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    // FILTER OBJECT
    const filter = {
      user: req.user._id,
    };

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    // DATE FILTER
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    // SORTING
    const sortOptions = {};

    sortOptions[sortBy] =
      order === "asc" ? 1 : -1;

    // PAGINATION
    const skip =
      (Number(page) - 1) * Number(limit);

    const transactions =
      await Transaction.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit));

    const total =
      await Transaction.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      data: transactions,
    });
  }
);


// GET SINGLE TRANSACTION
export const getTransactionById =
  asyncHandler(async (req, res) => {
    const transaction =
      await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!transaction) {
      res.status(404);

      throw new Error(
        "Transaction not found"
      );
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  });


// UPDATE TRANSACTION
export const updateTransaction =
  asyncHandler(async (req, res) => {
    const transaction =
      await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!transaction) {
      res.status(404);

      throw new Error(
        "Transaction not found"
      );
    }

    const updatedTransaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Transaction updated successfully",
      data: updatedTransaction,
    });
  });


// DELETE TRANSACTION
export const deleteTransaction =
  asyncHandler(async (req, res) => {
    const transaction =
      await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!transaction) {
      res.status(404);

      throw new Error(
        "Transaction not found"
      );
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Transaction deleted successfully",
    });
  });