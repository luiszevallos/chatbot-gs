import { Router } from "express";
import { getWebhook, postWebhook } from "../controllers/webhook-controllers";
import markAsRead from "../middlewares/mark-as-read";

const router = Router();

router.get("/", getWebhook);

router.post("/", [markAsRead], postWebhook);

export default router;
