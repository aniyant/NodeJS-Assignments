import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "token is not provide please provide the token" });
  }
  const token = req.headers["authorization"].split(" ")[1];

  //here we have to check if token  is blacklist or not

  if (token) {
    jwt.verify(token, "masai", (err, result) => {
      if (err) console.log(err);
      if (result) {
        req.user = result;
        next();
      } else {
        res.status(400).send("this  is not a valid token");
      }
    });
  }
  // how we are going to check this if user is valid or not
};

export default auth;
