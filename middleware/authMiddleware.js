import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";

export const protect = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim()

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET)

    const userData = await User.find({email:isVerified.email}).select({ password: 0 })

    req.user = userData
    req.token = token
    req.userId = userData._id

    next();
    
  } catch (error) {
    return res.status(401).json({message: "Unauthorized HTTP, Invalid Token"})
  }
};
