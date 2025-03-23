import { Router } from "express";
import v1Routes from "./v1/index.js"

const apiRoutes = Router();

apiRoutes.use("/v1", v1Routes);

export default apiRoutes;