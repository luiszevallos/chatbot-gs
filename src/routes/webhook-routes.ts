import { Router } from "express";
import { getWebhook, postWebhook } from "../controllers/webhook-controllers";
import {
  ValidChatStarted,
  markAsRead,
  openSupportForm,
  validMessage,
} from "../middlewares";

const router = Router();

router.get("/", getWebhook);

router.post(
  "/",
  [validMessage, markAsRead, ValidChatStarted, openSupportForm],
  postWebhook
);

export default router;
