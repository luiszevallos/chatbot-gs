"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controllers_1 = require("../controllers/webhook-controllers");
const router = (0, express_1.Router)();
router.get("/", webhook_controllers_1.getWebhook);
router.post("/", webhook_controllers_1.postWebhook);
exports.default = router;
//# sourceMappingURL=webhook-routes.js.map