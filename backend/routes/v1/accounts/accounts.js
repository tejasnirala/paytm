import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.js";
import { balance, transfer } from "../../../controllers/index.js";

const accountRouter = Router();

accountRouter.get('/balance', authMiddleware, balance)
accountRouter.post('/transfer', authMiddleware, transfer)

export default accountRouter;
