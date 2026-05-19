import Category from "../models/Category.js";

import asyncHandler from "../utils/asyncHandler.js";


// CREATE CATEGORY
export const createCategory =
  asyncHandler(async (req, res) => {
    const { name, type } = req.body;

    // CHECK DUPLICATE
    const existing =
      await Category.findOne({
        name,
        user: req.user._id,
      });

    if (existing) {
      res.status(400);

      throw new Error(
        "Category already exists"
      );
    }

    const category =
      await Category.create({
        name,
        type,
        user: req.user._id,
      });

    res.status(201).json({
      success: true,
      message:
        "Category created successfully",
      data: category,
    });
  });


// GET ALL CATEGORIES
export const getCategories =
  asyncHandler(async (req, res) => {
    const categories =
      await Category.find({
        $or: [
          { isDefault: true },
          { user: req.user._id },
        ],
      }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  });


// UPDATE CATEGORY
export const updateCategory =
  asyncHandler(async (req, res) => {
    const category =
      await Category.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!category) {
      res.status(404);

      throw new Error(
        "Category not found"
      );
    }

    // PREVENT DEFAULT UPDATE
    if (category.isDefault) {
      res.status(403);

      throw new Error(
        "Default categories cannot be updated"
      );
    }

    category.name =
      req.body.name || category.name;

    category.type =
      req.body.type || category.type;

    await category.save();

    res.status(200).json({
      success: true,
      message:
        "Category updated successfully",
      data: category,
    });
  });


// DELETE CATEGORY
export const deleteCategory =
  asyncHandler(async (req, res) => {
    const category =
      await Category.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!category) {
      res.status(404);

      throw new Error(
        "Category not found"
      );
    }

    // PREVENT DEFAULT DELETE
    if (category.isDefault) {
      res.status(403);

      throw new Error(
        "Default categories cannot be deleted"
      );
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Category deleted successfully",
    });
  });