import { Router } from "express";
import { getWebhook, postWebhook } from "../controllers/webhook-controllers";
import { markAsRead, openSupportForm, validMessage } from "../middlewares";

const router = Router();

router.get("/", getWebhook);

router.post("/", [validMessage, markAsRead, openSupportForm], postWebhook);

export default router;
