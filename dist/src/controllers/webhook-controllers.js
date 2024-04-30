"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importStar(require("../utils/axios"));
const config_global_1 = require("../../config-global");
const getWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("init get");
        let mode = req.query["hub.mode"];
        console.log("🚀 ~ getWebhook ~ mode:", mode);
        let challenge = req.query["hub.challenge"];
        console.log("🚀 ~ getWebhook ~ challenge:", challenge);
        let token = req.query["hub.verify_token"];
        console.log("🚀 ~ getWebhook ~ token:", token);
        if (token === config_global_1.VERIFY_TOKEN) {
            res.status(200).send(challenge);
        }
        else {
            res.status(403).json({
                message: "Error en conectar bot",
            });
        }
    }
    catch (error) {
        console.log("🚀 ~ getWebhook ~ error:", error);
    }
});
exports.getWebhook = getWebhook;
const postWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { body } = req;
    console.log("🚀 ~ postWebhook ~ body:", JSON.stringify(body, null, 2));
    if (body.object) {
        if (body.entry &&
            body.entry[0].changes &&
            ((_b = (_a = body.entry[0].changes[0]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.message) &&
            ((_c = body.entry[0].changes[0].value) === null || _c === void 0 ? void 0 : _c.message[0])) {
            const phoneNumberId = body.entry[0].challenge[0].value.metadata.phone_number_id;
            console.log("🚀 ~ postWebhook ~ phoneNumberId:", phoneNumberId);
            const from = body.entry[0].changes[0].value.messages[0].from;
            const msgBody = body.entry[0].changes[0].value.messages[0].text.body;
            console.log("🚀 ~ postWebhook ~ msgBody:", msgBody);
            yield axios_1.default.post(axios_1.endpoints.messages, {
                messaging_product: "whatsapp",
                to: from,
                text: {
                    body: "HI.. Im P",
                },
            });
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }
});
exports.postWebhook = postWebhook;
//# sourceMappingURL=webhook-controllers.js.map