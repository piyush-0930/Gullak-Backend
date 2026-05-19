import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Gullak Backend API",

      version: "1.0.0",

      description:
        "REST API for Gullak Expense Tracker Application",
    },

    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://gullak-backend-api.onrender.com"
            : "http://localhost:5000",

        description:
          process.env.NODE_ENV === "production"
            ? "Production Server"
            : "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",

          scheme: "bearer",

          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;