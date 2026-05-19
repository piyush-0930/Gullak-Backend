import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import hpp from "hpp";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

import swaggerSpec from "./docs/swagger.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

const app = express();


// BODY PARSER
app.use(express.json());


// SECURITY
app.use(hpp());

app.use(cors());

app.use(helmet());


// LOGGER
app.use(morgan("dev"));


// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Tracker API Running",
  });
});


// ROUTES
app.use("/api/auth", authRoutes);

app.use(
  "/api/transactions",
  transactionRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);


// SWAGGER DOCS
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


// NOT FOUND MIDDLEWARE
app.use(notFound);


// ERROR HANDLER
app.use(errorHandler);


export default app;