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
const messages_1 = require("../db/messages");
const helpers_1 = require("../helpers");
const getWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];
    // let mode = req.query["hub.mode"];
    if (token === config_global_1.VERIFY_TOKEN) {
        res.status(200).send(challenge);
    }
    else {
        res.status(403).json({
            message: "Error en token de verificación",
            ok: false,
        });
    }
});
exports.getWebhook = getWebhook;
const postWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { message } = req;
    if (!message) {
        return res.sendStatus(404);
    }
    try {
        const { from, type } = message;
        if (type === "interactive") {
            yield (0, helpers_1.responseMessageInteractive)(message);
        }
        else {
            yield (0, helpers_1.sendMessageInteractive)(from, messages_1.dbMessages.main);
        }
    }
    catch (error) {
        const message = ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message || error;
        console.error("🚀 ~ postWebhook ~ error:", message);
    }
    return res.sendStatus(200);
});
exports.postWebhook = postWebhook;
//# sourceMappingURL=webhook-controllers.js.map