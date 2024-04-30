import { Router } from "express";
import { getWebhook } from "../controllers/webhook-controllers";

const router = Router();

router.get("/", getWebhook);

export default router;
