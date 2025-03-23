import { Router } from "express";
import userRoutes from "./users/users.js";
import accountRoutes from "./accounts/accounts.js";

const router = Router();

router.use('/user', userRoutes);
router.use('/account', accountRoutes);


export default router;