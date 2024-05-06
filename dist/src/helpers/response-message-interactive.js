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
// import { dbMessages } from "../db/messages";
const messages_1 = require("../db/messages");
const models_1 = require("../models");
const send_message_interactive_1 = __importDefault(require("./send-message-interactive"));
const send_message_text_1 = __importDefault(require("./send-message-text"));
// import sendMessageInteractive from "./send-message-interactive";
// import sendMessageText from "./send-message-text";
const responseMessageInteractive = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { from: phoneNumber, interactive } = message;
    const replyId = ((_a = interactive === null || interactive === void 0 ? void 0 : interactive.list_reply) === null || _a === void 0 ? void 0 : _a.id) || ((_b = interactive === null || interactive === void 0 ? void 0 : interactive.button_reply) === null || _b === void 0 ? void 0 : _b.id);
    const sendFormSupport = () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield models_1.ChatModels.findOne({
            where: {
                phoneNumber,
                open: true,
            },
        });
        if (chat) {
            const email = chat.dataValues.email;
            const data = {
                phoneNumber,
                email,
                description: `Usuario no puede ingresar a la plataforma con el correo: ${email}`,
            };
            // TODO: Aquí se envía el formulario a soporte
            yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.support.message);
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.continue);
        }
    });
    const closeConversation = () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield models_1.ChatModels.findOne({
            where: {
                phoneNumber,
                open: true,
            },
        });
        if (chat) {
            yield chat.update({
                open: false,
            });
        }
        return yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.bye.message);
    });
    const createFormAnother = () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield models_1.ChatModels.findOne({
            where: {
                phoneNumber,
                open: true,
            },
        });
        if (chat) {
            yield models_1.FormSupportModels.create({
                type: "other",
                phoneNumber,
                email: chat.dataValues.email,
                description: "",
                uri: "",
            });
        }
        return yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.other.message);
    });
    switch (replyId) {
        case "1":
            return yield sendFormSupport();
        case "2":
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.didNotDisplayPayment);
        case "3":
            return yield createFormAnother();
        case "6":
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.main);
        case "7":
            return yield closeConversation();
        case "8":
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.continue);
        case "11":
            yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.visualizePaymentZelle.message);
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.resolveDoubt);
        case "12":
            yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.visualizePaymentMobile.message);
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.resolveDoubt);
        case "20":
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.typeBank);
        case "23":
            yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.otherBank.message);
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.continue);
        default:
            break;
    }
    // const sendFormSupport = async () => {
    //   const formSupport = await FormSupportModels.findOne({
    //     where: {
    //       phoneNumber: message.from,
    //       open: true,
    //     },
    //   });
    //   if (formSupport) {
    //     await formSupport.update({ open: false });
    //   }
    //   await sendMessageText(from, dbMessages.response.confirm.message);
    //   return await sendMessageInteractive(from, dbMessages.continueConversation);
    // };
    // const resetFormSupport = async () => {
    //   const formSupport = await FormSupportModels.findOne({
    //     where: {
    //       phoneNumber: message.from,
    //       open: true,
    //     },
    //   });
    //   if (formSupport) {
    //     await formSupport.update({
    //       open: true,
    //       locator: "",
    //       amount: "",
    //       reference: "",
    //     });
    //   }
    //   return await sendMessageText(from, dbMessages.form.locator.message);
    // };
    // switch (replyId) {
    //   // ? Response 1 --> 11 --> 111
    //   case "1":
    //     console.log("🚀 ~ responseMessageInteractive ~ message:", message);
    //     return await sendMessageInteractive(from, dbMessages.response.res1);
    //   case "11":
    //     return await sendMessageInteractive(from, dbMessages.response.res11);
    //   case "12":
    //     await sendMessageText(from, dbMessages.response.res12.message);
    //     return await sendMessageInteractive(
    //       from,
    //       dbMessages.continueConversation
    //     );
    //   case "111":
    //     await sendMessageText(from, dbMessages.response.res111.message);
    //     return await sendMessageInteractive(
    //       from,
    //       dbMessages.continueConversation
    //     );
    //   case "112":
    //     await sendMessageText(from, dbMessages.response.res112.message);
    //     return await sendMessageInteractive(
    //       from,
    //       dbMessages.continueConversation
    //     );
    //   // ? Response 2 --> 22 --> 222
    //   case "2":
    //     return await sendMessageInteractive(from, dbMessages.response.res2);
    //   case "21":
    //     await sendMessageText(from, dbMessages.response.res21.message);
    //     return await sendMessageInteractive(
    //       from,
    //       dbMessages.continueConversation
    //     );
    //   case "22":
    //     await sendMessageText(from, dbMessages.response.res22.message);
    //     return await sendMessageInteractive(
    //       from,
    //       dbMessages.continueConversation
    //     );
    //   case "23":
    //     await sendMessageText(from, dbMessages.response.res23.message);
    //     return await sendMessageInteractive(
    //       from,
    //       dbMessages.continueConversation
    //     );
    //   case "24":
    //     await sendMessageText(from, dbMessages.response.res24.message);
    //     return await sendMessageInteractive(
    //       from,
    //       dbMessages.continueConversation
    //     );
    //   // ? Response 3 --> 33 --> 333
    //   case "3":
    //     await sendMessageText(from, dbMessages.response.res3.message);
    //     return await sendMessageInteractive(from, dbMessages.resolved3);
    //   case "31":
    //     return await sendMessageInteractive(
    //       from,
    //       dbMessages.continueConversation
    //     );
    //   case "32":
    //     return await createdFormSupport();
    //   // ? Response 4 --> 44 --> 444
    //   case "4":
    //     return await sendMessageInteractive(
    //       from,
    //       dbMessages.continueConversation
    //     );
    //   case "41":
    //     return await sendMessageInteractive(from, dbMessages.welcome);
    //   case "42":
    //     return await sendMessageText(from, dbMessages.goodBye.message);
    //   // ? Response de form
    //   case "form_1":
    //     return await sendFormSupport();
    //   case "form_2":
    //     return await resetFormSupport();
    //   default:
    //     return await sendMessageInteractive(from, dbMessages.welcome);
    // }
});
exports.default = responseMessageInteractive;
//# sourceMappingURL=response-message-interactive.js.map