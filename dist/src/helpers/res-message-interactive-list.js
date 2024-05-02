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
const send_message_contacts_1 = __importDefault(require("./send-message-contacts"));
const send_message_interactive_1 = __importDefault(require("./send-message-interactive"));
const send_message_text_1 = __importDefault(require("./send-message-text"));
const resMessageInteractive = (_a) => __awaiter(void 0, [_a], void 0, function* ({ from, interactive }) {
    var _b, _c, _d;
    try {
        const replyId = ((_b = interactive === null || interactive === void 0 ? void 0 : interactive.list_reply) === null || _b === void 0 ? void 0 : _b.id) || ((_c = interactive === null || interactive === void 0 ? void 0 : interactive.button_reply) === null || _c === void 0 ? void 0 : _c.id);
        switch (replyId) {
            // ? Response 1 --> 11 --> 111
            case "1":
                yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.response["1"]);
                break;
            case "11":
                yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.response["11"]);
                break;
            case "12":
                yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response["12"].message);
                yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
                break;
            case "111":
                yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response["111"].message);
                yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
                break;
            case "112":
                yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response["112"].message);
                yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
                break;
            // ? Response 2 --> 22 --> 222
            case "2":
                yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.response["2"]);
                break;
            // ? Response 3 --> 33 --> 333
            case "3":
                console.log("3");
                yield (0, send_message_contacts_1.default)(from);
                break;
            case "4":
                yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
                break;
            case "41":
                yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.welcome);
                break;
            case "42":
                yield (0, send_message_text_1.default)(from, messages_1.dbMessages.goodBye.message);
                break;
            default:
                yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.welcome);
                break;
        }
    }
    catch (error) {
        console.log(JSON.stringify(error));
        const message = ((_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) || error.message || error;
        console.error("🚀 ~ resMessageInteractive ~ error:", message);
    }
});
exports.default = resMessageInteractive;
//# sourceMappingURL=res-message-interactive-list.js.map