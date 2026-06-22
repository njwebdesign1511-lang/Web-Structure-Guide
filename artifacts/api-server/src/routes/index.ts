import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contentRouter from "./content";
import adminRouter from "./admin";
import openaiRouter from "./openai";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contentRouter);
router.use(adminRouter);
router.use(openaiRouter);

export default router;
