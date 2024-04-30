"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatbot_controllers_1 = require("../controllers/chatbot-controllers");
const router = (0, express_1.Router)();
router.get("/", chatbot_controllers_1.getChatbot);
exports.default = router;
//# sourceMappingURL=chatbot-routes.js.map