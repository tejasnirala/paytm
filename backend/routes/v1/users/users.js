import { Router } from "express";
import { bulk, me, signin, signup, update, verifyOTP, forgotPassword, resetPassword } from "../../../controllers/index.js";
import { authMiddleware } from "../../../middlewares/auth.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/verify-otp", verifyOTP);
userRouter.get("/me", authMiddleware, me);
userRouter.get("/bulk", authMiddleware, bulk);
userRouter.put("/", authMiddleware, update);
userRouter.post("/password/forgot", forgotPassword);
userRouter.post("/password/reset/:token", resetPassword);

export default userRouter;
