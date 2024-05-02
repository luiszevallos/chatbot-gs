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
    var _a, _b, _c, _d, _e;
    const { object, entry } = req.body;
    try {
        if (object && (entry === null || entry === void 0 ? void 0 : entry.length) > 0) {
            const change = entry[0].changes[0];
            if (change && ((_b = (_a = change === null || change === void 0 ? void 0 : change.value) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                const messageReceived = change.value.messages[0];
                try {
                    const { from, type, interactive } = messageReceived;
                    console.log("🚀 ~ postWebhook ~ messageReceived:", messageReceived);
                    console.log("🚀 ~ postWebhook ~ from:", from);
                    if (type === "interactive") {
                        // TODO: aquí va el switch para responde dependiendo la interacción
                        if ((interactive === null || interactive === void 0 ? void 0 : interactive.type) === "list_reply") {
                            switch ((_c = interactive === null || interactive === void 0 ? void 0 : interactive.list_reply) === null || _c === void 0 ? void 0 : _c.id) {
                                case "2":
                                    yield (0, helpers_1.sendMessageInteractive)(from, messages_1.dbMessages.response["2"]);
                                    break;
                                case "3":
                                    yield (0, helpers_1.sendMessageInteractive)(from, messages_1.dbMessages.response["3"]);
                                    break;
                                case "4":
                                    yield (0, helpers_1.sendMessageInteractive)(from, messages_1.dbMessages.response["4"]);
                                    break;
                                case "42":
                                    yield (0, helpers_1.sendMessageText)(from, (_d = messages_1.dbMessages.response["42"]) === null || _d === void 0 ? void 0 : _d.message);
                                    break;
                                default:
                                    yield (0, helpers_1.sendMessageInteractive)(from, messages_1.dbMessages.welcome);
                                    break;
                            }
                        }
                    }
                    else {
                        // * envía el mensaje de bienvenida primer contacto
                        yield (0, helpers_1.sendMessageInteractive)(from, messages_1.dbMessages.welcome);
                    }
                }
                catch (error) {
                    const message = ((_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.data) || error.message || error;
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