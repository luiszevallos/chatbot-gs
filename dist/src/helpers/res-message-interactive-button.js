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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../db/messages");
const send_message_interactive_1 = __importDefault(require("./send-message-interactive"));
const send_message_text_1 = __importDefault(require("./send-message-text"));
const resMessageInteractiveButton = (_a) => __awaiter(void 0, [_a], void 0, function* ({ from, interactive }) {
    var _b, _c;
    try {
        switch ((_b = interactive === null || interactive === void 0 ? void 0 : interactive.button_reply) === null || _b === void 0 ? void 0 : _b.id) {
            case "42":
                yield (0, send_message_text_1.default)(from, (_c = messages_1.dbMessages.response["42"]) === null || _c === void 0 ? void 0 : _c.message);
                break;
            default:
                yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.welcome);
                break;
        }
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.default = resMessageInteractiveButton;
//# sourceMappingURL=res-message-interactive-button.js.map