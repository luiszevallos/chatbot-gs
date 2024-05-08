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
const models_1 = require("../models");
const messages_1 = require("../db/messages");
//
const send_form_support_1 = require("./send-form-support");
const send_message_interactive_1 = __importDefault(require("./send-message-interactive"));
const send_message_text_1 = __importDefault(require("./send-message-text"));
const responseMessageInteractive = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { from: phoneNumber, interactive } = message;
    const replyId = ((_a = interactive === null || interactive === void 0 ? void 0 : interactive.list_reply) === null || _a === void 0 ? void 0 : _a.id) || ((_b = interactive === null || interactive === void 0 ? void 0 : interactive.button_reply) === null || _b === void 0 ? void 0 : _b.id);
    // ? Enviar form a soporte de no puedo ingresar a la plataforma
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
    // ? cierra la conversación y envía mensaje de dependida
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
    // ? Inicializa un form de soporte type (otro)
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
    // ? Inicializa un form de soporte type (Pago móvil)
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
    // ? Inicializa un form de soporte type (Zelle)
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
    // ? reiniciar form de soporte
    const resetForm = () => __awaiter(void 0, void 0, void 0, function* () {
        const form = yield models_1.FormSupportModels.findOne({
            where: {
                phoneNumber,
                open: false,
                send: true,
            },
        });
        if (form) {
            form.update({
                send: false,
                open: true,
                reference: "",
                locator: "",
                amount: "",
                uri: "",
                issuerNumber: "",
                description: "",
            });
            switch (form.dataValues.type) {
                case "zelle":
                    return yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.form.zelle.reference.message);
                case "paymentMobile":
                    return yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.form.paymentMobile.reference.message);
                case "other":
                    return yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.form.other.description.message);
                default:
                    return;
            }
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
            return yield resetForm();
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
            return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.main);
    }
});
exports.default = responseMessageInteractive;
//# sourceMappingURL=response-message-interactive.js.map