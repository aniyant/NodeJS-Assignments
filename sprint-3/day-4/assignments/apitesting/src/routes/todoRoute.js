import { Router } from "express";
import todoModel from "../models/todoMode.js";

const todoRouter = Router();

todoRouter.get("/", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.send(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

todoRouter.get("/:id", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
});

todoRouter.post("/", async (req, res) => {
  const { title, desc } = req.body;
  try {
    const todo = new todoModel({
      title,
      desc,
      userId: req.user.id,
      createTime: Date.now(),
    });
    await todo.save();

    res.status(201).json({ message: "todo is created successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

todoRouter.patch("/:id", async (req, res) => {
  try {
    const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("todo is updated successfully");

    // if (req.user.id == String(todo.userId)) {
    //   const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body);
    // }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

todoRouter.delete("/:id", async (req, res) => {
  try {
    await todoModel.findByIdAndDelete(req.params.id);
    res.status(200).send("todo is deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default todoRouter;
