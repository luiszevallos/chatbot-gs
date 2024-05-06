"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controllers_1 = require("../controllers/webhook-controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/", webhook_controllers_1.getWebhook);
router.post("/", [middlewares_1.validMessage, middlewares_1.markAsRead, middlewares_1.ValidChatStarted, middlewares_1.openSupportForm], webhook_controllers_1.postWebhook);
exports.default = router;
//# sourceMappingURL=webhook-routes.js.map