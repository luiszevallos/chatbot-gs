import { Router } from "express";
import { getWebhook, postWebhook } from "../controllers/webhook-controllers";
import { markAsRead, validMessage } from "../middlewares";

const router = Router();

router.get("/", getWebhook);

router.post("/", [validMessage, markAsRead], postWebhook);

export default router;
