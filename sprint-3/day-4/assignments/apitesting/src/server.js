import express from "express";
import { config } from "dotenv";
import connectToDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import todoRouter from "./routes/todoRoute.js";
import auth from "./middlewares/auth.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import openapiSpecification from "./config/apiconfig.js";
import rateLimit from "express-rate-limit";
import limiter from "./middlewares/rateLimiter.js";
config();
const app = express();
const port = process.env.PORT || 9090;
const db_uri = process.env.DB_URI || null;
app.use(express.json());
app.use(express.static("public"));

app.use(limiter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.get("/test", (req, res) => {
  res.status(200).json({ message: "this is a rest route" });
});
app.use(cors({ credentials: true }));
app.use("/users", userRouter);

app.use("/todos", auth, todoRouter);

app.listen(port, async () => {
  try {
    await connectToDB(db_uri);
    console.log("we are successfully connected to database");
    console.log(`server is running at port ${port} `);
  } catch (err) {
    console.log(err);
  }
});

export default app;

// user auth and authrorization

//todo -> you will create the todo
// user - aashish -> i am the one who create the todo , if i will try to get all the todos
//
