import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contentRouter from "./content";
import adminRouter from "./admin";
import openaiRouter from "./openai";
import authRouter from "./auth";
import leadsRouter from "./leads";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contentRouter);
router.use(adminRouter);
router.use(openaiRouter);
router.use(authRouter);
router.use(leadsRouter);

export default router;
