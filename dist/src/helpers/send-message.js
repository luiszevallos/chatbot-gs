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
exports.sendMessageInteractiveList = exports.sendMessageInteractiveButton = exports.sendMessageText = void 0;
const axios_1 = __importStar(require("../utils/axios"));
const sendMessageText = (to, message) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.post(axios_1.endpoints.messages, {
        to,
        type: "text",
        messaging_product: "whatsapp",
        text: {
            body: message,
        },
    });
});
exports.sendMessageText = sendMessageText;
const sendMessageInteractiveButton = (to, message, buttons) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.post(axios_1.endpoints.messages, {
        messaging_product: "whatsapp",
        type: "interactive",
        to,
        interactive: {
            type: "button",
            body: {
                text: message,
            },
            action: {
                buttons,
            },
        },
    });
});
exports.sendMessageInteractiveButton = sendMessageInteractiveButton;
const sendMessageInteractiveList = (to, message, sections, title) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        messaging_product: "whatsapp",
        type: "interactive",
        to,
        interactive: {
            type: "list",
            header: {
                type: "text",
                text: message,
            },
            body: {
                text: "",
            },
            footer: {
                text: "",
            },
            action: {
                button: title || message,
                sections,
            },
        },
    };
    console.log("🚀 ~ data:", data);
    return yield axios_1.default.post(axios_1.endpoints.messages, data);
});
exports.sendMessageInteractiveList = sendMessageInteractiveList;
//# sourceMappingURL=send-message.js.map