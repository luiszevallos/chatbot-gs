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
const responseMessageInteractive = (_a) => __awaiter(void 0, [_a], void 0, function* ({ from, interactive }) {
    var _b, _c;
    const replyId = ((_b = interactive === null || interactive === void 0 ? void 0 : interactive.list_reply) === null || _b === void 0 ? void 0 : _b.id) || ((_c = interactive === null || interactive === void 0 ? void 0 : interactive.button_reply) === null || _c === void 0 ? void 0 : _c.id);
    switch (replyId) {
        // ? Response 1 --> 11 --> 111
        case "1":
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.response.res1);
        case "11":
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.response.res11);
        case "12":
            yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response.res12.message);
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
        case "111":
            yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response.res111.message);
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
        case "112":
            yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response.res112.message);
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
        // ? Response 2 --> 22 --> 222
        case "2":
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.response.res2);
        case "21":
            yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response.res21.message);
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
        case "22":
            yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response.res22.message);
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
        case "23":
            yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response.res23.message);
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
        case "24":
            yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response.res24.message);
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
        // ? Response 3 --> 33 --> 333
        case "3":
            return yield (0, send_message_text_1.default)(from, messages_1.dbMessages.response.res3.message);
        // ? Response 4 --> 44 --> 444
        case "4":
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.continueConversation);
        case "41":
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.welcome);
        case "42":
            return yield (0, send_message_text_1.default)(from, messages_1.dbMessages.goodBye.message);
        default:
            return yield (0, send_message_interactive_1.default)(from, messages_1.dbMessages.welcome);
    }
});
exports.default = responseMessageInteractive;
//# sourceMappingURL=response-message-interactive.js.map