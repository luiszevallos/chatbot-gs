import { Router } from "express";
import { getWebhook, postWebhook } from "../controllers/webhook-controllers";

const router = Router();

router.get("/", getWebhook);

router.post("/", postWebhook);

export default router;
