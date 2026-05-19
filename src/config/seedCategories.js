import Category from "../models/Category.js";

import defaultCategories from "../utils/defaultCategories.js";

const seedDefaultCategories = async () => {
  try {
    const existing =
      await Category.countDocuments({
        isDefault: true,
      });

    if (existing === 0) {
      await Category.insertMany(
        defaultCategories
      );

      console.log(
        "Default categories seeded"
      );
    }
  } catch (error) {
    console.error(
      "Category seeding failed:",
      error.message
    );
  }
};

export default seedDefaultCategories;