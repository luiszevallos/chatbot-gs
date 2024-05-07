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
const send_form_support_1 = require("./send-form-support");
const send_message_interactive_1 = __importDefault(require("./send-message-interactive"));
const send_message_text_1 = __importDefault(require("./send-message-text"));
const responseMessageInteractive = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { from: phoneNumber, interactive } = message;
    const replyId = ((_a = interactive === null || interactive === void 0 ? void 0 : interactive.list_reply) === null || _a === void 0 ? void 0 : _a.id) || ((_b = interactive === null || interactive === void 0 ? void 0 : interactive.button_reply) === null || _b === void 0 ? void 0 : _b.id);
    const sendFormSupportAccessDenied = () => __awaiter(void 0, void 0, void 0, function* () {
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
                concept: "No puedo ingresar",
                description: `Usuario no puede ingresar a la plataforma con el correo: ${email}`,
            };
            yield (0, send_form_support_1.sendFormSupport)(data);
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
        const { description } = messages_1.dbMessages.form.other;
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
        return yield (0, send_message_text_1.default)(phoneNumber, description.message);
    });
    const createFormPaymentMobile = (bank) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield models_1.ChatModels.findOne({
            where: {
                phoneNumber,
                open: true,
            },
        });
        if (chat) {
            yield models_1.FormSupportModels.create({
                email: chat.dataValues.email,
                type: "paymentMobile",
                phoneNumber,
                bank,
            });
        }
        return yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.form.paymentMobile.reference.message);
    });
    const createFormZelle = () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield models_1.ChatModels.findOne({
            where: {
                phoneNumber,
                open: true,
            },
        });
        if (chat) {
            yield models_1.FormSupportModels.create({
                email: chat.dataValues.email,
                type: "zelle",
                phoneNumber,
            });
        }
        return yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.form.zelle.reference.message);
    });
    const cancelForm = () => __awaiter(void 0, void 0, void 0, function* () {
        const form = yield models_1.FormSupportModels.findOne({
            where: {
                phoneNumber,
                open: false,
                send: true,
            },
        });
        if (form) {
            form.update({
                cancelled: true,
                send: false,
                open: false,
            });
        }
        return;
    });
    switch (replyId) {
        case "1":
            // ? envía el formulario de no puedo ingresa a soporte
            return yield sendFormSupportAccessDenied();
        case "2":
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.didNotDisplayPayment);
        case "3":
            // ? crear formulario de otros problema
            return yield createFormAnother();
        case "4":
            // ? Envía formulario a soporte
            const body = yield (0, send_form_support_1.dataFormSupport)(phoneNumber);
            if (body) {
                yield (0, send_form_support_1.sendFormSupport)(body);
            }
            yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.support.message);
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.continue);
        case "5":
            yield cancelForm();
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.continue);
        case "6":
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.main);
        case "7":
            return yield closeConversation();
        case "8":
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.continue);
        case "11":
            yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.visualizePaymentZelle.message);
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.resolveDoubtZelle);
        case "12":
            yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.visualizePaymentMobile.message);
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.resolveDoubtPaymentMobile);
        case "13":
            yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.validatePayment.message);
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.continue);
        case "20":
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.typeBank);
        case "21":
            return yield createFormPaymentMobile("Bancamiga");
        case "22":
            return yield createFormPaymentMobile("BFC");
        case "23":
            yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.otherBank.message);
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.continue);
        case "25":
            return yield createFormZelle();
        default:
            break;
    }
});
exports.default = responseMessageInteractive;
//# sourceMappingURL=response-message-interactive.js.map