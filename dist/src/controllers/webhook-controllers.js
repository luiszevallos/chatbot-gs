"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postWebhook = exports.getWebhook = void 0;
//
const config_global_1 = require("../../config-global");
const send_message_1 = require("../helpers/send-message");
const messages_1 = require("../db/messages");
const getWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];
    if (token === config_global_1.VERIFY_TOKEN) {
        res.status(200).send(challenge);
    }
    else {
        res.status(403).json({
            message: "Error en conectar bot",
        });
    }
});
exports.getWebhook = getWebhook;
const postWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { object, entry } = req.body;
    if (object && (entry === null || entry === void 0 ? void 0 : entry.length) > 0) {
        const change = entry[0].changes[0];
        if (change) {
            if (((_b = (_a = change === null || change === void 0 ? void 0 : change.value) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                const messageReceived = change.value.messages[0];
                const { from, type, interactive } = messageReceived;
                switch (type) {
                    case "text":
                        const { message, buttons } = messages_1.dbMessages.welcome;
                        yield (0, send_message_1.sendMessageInteractiveButton)(from, message, buttons);
                        return res.sendStatus(200);
                    case "interactive":
                        if ((interactive === null || interactive === void 0 ? void 0 : interactive.type) === "button_reply") {
                            const { sections, header } = messages_1.dbMessages.frequent_questions;
                            yield (0, send_message_1.sendMessageInteractiveList)(from, header.message, sections, "Lista");
                            return res.sendStatus(200);
                        }
                        break;
                    default:
                        break;
                }
            }
            else {
                return res.sendStatus(404);
            }
        }
    }
});
exports.postWebhook = postWebhook;
//# sourceMappingURL=webhook-controllers.js.map