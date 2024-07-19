import swaggerJsdoc from "swagger-jsdoc";
import { serve } from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TODO Rest ApI",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:8080" }],
  },

  apis: ["./src/routes/*.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
