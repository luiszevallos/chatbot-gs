"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controllers_1 = require("../controllers/webhook-controllers");
const mark_as_read_1 = __importDefault(require("../middlewares/mark-as-read"));
const router = (0, express_1.Router)();
router.get("/", webhook_controllers_1.getWebhook);
router.post("/", [mark_as_read_1.default], webhook_controllers_1.postWebhook);
exports.default = router;
//# sourceMappingURL=webhook-routes.js.map