import { body } from "express-validator";

export const createCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required"),

  body("type")
    .isIn(["income", "expense"])
    .withMessage(
      "Type must be income or expense"
    ),
];