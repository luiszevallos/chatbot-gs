import { Router } from "express";
import { getChatbot } from "../controllers/chatbot-controllers";

const router = Router();

router.get("/", getChatbot);

export default router;
