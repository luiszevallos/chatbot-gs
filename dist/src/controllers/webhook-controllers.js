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
    let mode = req.query["hub.mode"];
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
    var _a, _b, _c;
    const { object, entry } = req.body;
    try {
        if (object && (entry === null || entry === void 0 ? void 0 : entry.length) > 0) {
            const change = entry[0].changes[0];
            console.log("🚀 ~ postWebhook ~ change:", change);
            if (change && ((_b = (_a = change === null || change === void 0 ? void 0 : change.value) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                const messageReceived = change.value.messages[0];
                try {
                    const { from, type, interactive } = messageReceived;
                    console.log("🚀 ~ postWebhook ~ from:", from);
                    if (type === "interactive") {
                        // TODO: aquí va el switch para responde dependiendo la interacción
                        if ((interactive === null || interactive === void 0 ? void 0 : interactive.type) === "list_reply") {
                            yield (0, helpers_1.resMessageInteractiveList)(messageReceived);
                        }
                        else if ((interactive === null || interactive === void 0 ? void 0 : interactive.type) === "button_reply") {
                            yield (0, helpers_1.resMessageInteractiveButton)(messageReceived);
                        }
                    }
                    else {
                        // * envía el mensaje de bienvenida primer contacto
                        yield (0, helpers_1.sendMessageInteractive)(from, messages_1.dbMessages.welcome);
                    }
                }
                catch (error) {
                    const message = ((_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data) || error.message || error;
                    console.log("🚀 ~ postWebhook ~ error:", message);
                }
                return res.sendStatus(200);
            }
        }
        return res.sendStatus(404);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.postWebhook = postWebhook;
//# sourceMappingURL=webhook-controllers.js.map