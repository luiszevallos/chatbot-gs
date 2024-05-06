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
const models_1 = require("../models");
const axios_1 = __importDefault(require("../utils/axios"));
const send_message_interactive_1 = __importDefault(require("./send-message-interactive"));
const send_message_text_1 = __importDefault(require("./send-message-text"));
const valid_field_1 = require("./valid-field");
class FormSupport {
    dbForm(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const formSupport = yield models_1.FormSupportModels.findOne({
                where: {
                    phoneNumber,
                    open: true,
                },
            });
            return formSupport;
        });
    }
    formOther(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { other } = messages_1.dbMessages.form;
            const { text, from: phoneNumber, image } = message;
            const formSupport = yield this.dbForm(phoneNumber);
            if (formSupport) {
                const { description, uri, email } = formSupport.dataValues;
                if (!description && message.type !== "text") {
                    // ? Solicita la descripción
                    return yield (0, send_message_text_1.default)(phoneNumber, other.description.message);
                }
                else if (!description) {
                    // ? Guarda la descripción y solicita la imagen
                    yield formSupport.update({ description: text.body });
                    return yield (0, send_message_text_1.default)(phoneNumber, other.uri.message);
                }
                else if (!uri && message.type !== "image") {
                    // ? Solicita la imagen
                    return yield (0, send_message_text_1.default)(phoneNumber, other.uri.message);
                }
                else if (!uri) {
                    // ? Guardar la imagen
                    const response = yield axios_1.default.get(`/${image.id}`);
                    // const resDownload = await axios.get(response.data.url)
                    // console.log(JSON.stringify(resDownload.data));
                    yield formSupport.update({ uri: response.data.url, open: false });
                    const data = {
                        imagen: response.data.url,
                        description,
                        phoneNumber,
                        email,
                    };
                    // TODO: aquí se envía en form a soporte
                    yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.support.message);
                    return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.continue);
                }
            }
        });
    }
    sendFormSupport(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("🚀 ~ FormSupport ~ sendFormSupport ~ data:", data);
        });
    }
    formPaymentMobile(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { paymentMobile } = messages_1.dbMessages.form;
            const { text, from: phoneNumber, image, interactive } = message;
            const formSupport = yield this.dbForm(phoneNumber);
            if (formSupport) {
                const { reference, locator, issuerNumber, amount, uri, email } = formSupport.dataValues;
                if (!reference) {
                    const notValid = (0, valid_field_1.validReference)(text.body);
                    if (notValid) {
                        return yield (0, send_message_text_1.default)(phoneNumber, notValid);
                    }
                    yield formSupport.update({ reference: text.body });
                    return yield (0, send_message_text_1.default)(phoneNumber, paymentMobile.reference.message);
                }
                else if (!locator) {
                    const notValid = (0, valid_field_1.validLocator)(text.body);
                    if (notValid) {
                        return yield (0, send_message_text_1.default)(phoneNumber, notValid);
                    }
                    yield formSupport.update({ locator: text.body });
                    return yield (0, send_message_text_1.default)(phoneNumber, paymentMobile.issuerNumber.message);
                }
                else if (!issuerNumber) {
                    const notValid = (0, valid_field_1.validNumberPhone)(text.body);
                    if (notValid) {
                        return yield (0, send_message_text_1.default)(phoneNumber, notValid);
                    }
                    yield formSupport.update({ phoneNumber: text.body });
                    return yield (0, send_message_text_1.default)(phoneNumber, paymentMobile.amount.message);
                }
                else if (!amount) {
                    const notValid = (0, valid_field_1.validAmount)(text.body);
                    if (notValid) {
                        return yield (0, send_message_text_1.default)(phoneNumber, notValid);
                    }
                    yield formSupport.update({ amount: text.body });
                    return yield (0, send_message_text_1.default)(phoneNumber, paymentMobile.uri.message);
                }
                else if (!uri) {
                    const notValid = (0, valid_field_1.validAmount)(text.body);
                    if (notValid) {
                        return yield (0, send_message_text_1.default)(phoneNumber, notValid);
                    }
                    const response = yield axios_1.default.get(`/${image.id}`);
                    yield formSupport.update({ uri: response.data.url });
                    return yield (0, send_message_interactive_1.default)(phoneNumber, {
                        type: "button",
                        body: {
                            text: `Ingresaste los siguiente datos: \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Número emisor*: ${issuerNumber} \n*Monto*: ${amount}`,
                        },
                        action: {
                            buttons: [
                                {
                                    type: "reply",
                                    reply: {
                                        id: "form_1",
                                        title: "Si",
                                    },
                                },
                                {
                                    type: "reply",
                                    reply: {
                                        id: "form_2",
                                        title: "No",
                                    },
                                },
                            ],
                        },
                    });
                }
                else {
                    const replyId = ((_a = interactive === null || interactive === void 0 ? void 0 : interactive.list_reply) === null || _a === void 0 ? void 0 : _a.id) || ((_b = interactive === null || interactive === void 0 ? void 0 : interactive.button_reply) === null || _b === void 0 ? void 0 : _b.id);
                    if (replyId === "form_1") {
                        yield this.sendFormSupport({
                            phoneNumber,
                            email,
                            concept: "Pago no validado",
                            uri,
                            text: `Datos ingresado \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Número emisor*: ${issuerNumber} \n*Monto*: ${amount}`,
                        });
                        yield formSupport.update({ open: false });
                        yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.support.message);
                        return yield (0, send_message_interactive_1.default)(phoneNumber, messages_1.dbMessages.continue);
                    }
                    else {
                        yield formSupport.update({
                            reference: "",
                            locator: "",
                            issuerNumber: "",
                            amount: "",
                            uri: "",
                        });
                        return yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.form.paymentMobile.reference.message);
                    }
                }
            }
        });
    }
    consultSupportForm(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from: phoneNumber } = message;
            const formSupport = yield this.dbForm(phoneNumber);
            if (formSupport) {
                const { type } = formSupport.dataValues;
                switch (type) {
                    case "other":
                        yield this.formOther(message);
                        break;
                    case "paymentMobile":
                        yield this.formPaymentMobile(message);
                        break;
                    default:
                        break;
                }
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.default = FormSupport;
//# sourceMappingURL=form-support.js.map