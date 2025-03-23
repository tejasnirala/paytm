import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      message: "Wrong authorization"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decode.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "You are unauthenticated to perform this action"
    });
  }
}