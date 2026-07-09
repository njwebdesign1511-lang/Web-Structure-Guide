import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import contentRouter from "./content.js";
import adminRouter from "./admin.js";
import openaiRouter from "./openai.js";
import authRouter from "./auth.js";
import leadsRouter from "./leads.js";
import reviewsRouter from "./reviews.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contentRouter);
router.use(adminRouter);
router.use(openaiRouter);
router.use(authRouter);
router.use(leadsRouter);
router.use(reviewsRouter);

export default router;
