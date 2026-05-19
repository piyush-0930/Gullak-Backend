import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import seedDefaultCategories from "./src/config/seedCategories.js";

const PORT = process.env.PORT || 5000;

connectDB();
seedDefaultCategories();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});