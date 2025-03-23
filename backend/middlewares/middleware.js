import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../configs/config.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Wrong authorization"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);

    req.userId = decode.userId;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "You are not authenticated to perform this action"
    });
  }
}