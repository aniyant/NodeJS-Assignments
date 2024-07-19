import { Router } from "express";
import multer from "multer";
import userModel from "../models/userMode.js";
import storage from "../services/filUpload.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const upload = multer({ storage: storage });

const userRouter = Router();

userRouter.post("/register", upload.single("avatar"), async (req, res) => {
  const { userName, email, password, avatar } = req.body;
  try {
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      res.status(400).send("user is already register try to login");
    }
    const user = new userModel({
      userName,
      email,
      password,
      avatar: req.file?.path,
    });
    await user.save();
    res.status(201).json({ message: "user is created successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await userModel.findOne({ email: email });
    if (!userExist) {
     return  res.status(400).send("user is already not register try to login");
    }

    if (!await bcrypt.compare(password,userExist.password)) {
      return res.status(401).send("password is not correct ");
    }

    const token = jwt.sign(
      { email: userExist.email, id: userExist._id },
      "masai"
    );
    res.json({ token: token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default userRouter;
