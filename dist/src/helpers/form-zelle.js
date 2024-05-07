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
const formZelle = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { zelle } = messages_1.dbMessages.form;
    const { text, from: phoneNumber, image, interactive } = message;
    const formSupport = yield models_1.FormSupportModels.findOne({
        where: {
            phoneNumber,
            open: true,
        },
    });
    if (formSupport) {
        const { reference, locator, amount, uri, email } = formSupport.dataValues;
        if (!reference) {
            const notValid = yield (0, valid_field_1.validReference)(text.body);
            if (notValid) {
                return yield (0, send_message_text_1.default)(phoneNumber, notValid);
            }
            else {
                yield formSupport.update({ reference: text.body });
                return yield (0, send_message_text_1.default)(phoneNumber, zelle.locator.message);
            }
        }
        else if (!locator) {
            const notValid = (0, valid_field_1.validLocator)(text.body);
            if (notValid) {
                return yield (0, send_message_text_1.default)(phoneNumber, notValid);
            }
            else {
                yield formSupport.update({ locator: text.body });
                return yield (0, send_message_text_1.default)(phoneNumber, zelle.amount.message);
            }
        }
        else if (!amount) {
            const notValid = (0, valid_field_1.validAmount)(text.body);
            if (notValid) {
                return yield (0, send_message_text_1.default)(phoneNumber, notValid);
            }
            else {
                yield formSupport.update({ amount: text.body });
                return yield (0, send_message_text_1.default)(phoneNumber, zelle.uri.message);
            }
        }
        else if (!uri) {
            if (message.type !== "image") {
                return yield (0, send_message_text_1.default)(phoneNumber, zelle.uri.message);
            }
            else {
                const response = yield axios_1.default.get(`/${image.id}`);
                yield formSupport.update({ uri: response.data.url });
                return yield (0, send_message_interactive_1.default)(phoneNumber, {
                    type: "button",
                    body: {
                        text: `Ingresaste los siguiente datos: \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Monto*: ${amount}`,
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
        }
        else if (message.type === "interactive" &&
            ((_a = message.interactive) === null || _a === void 0 ? void 0 : _a.type) === "button_reply") {
            const replyId = ((_b = interactive === null || interactive === void 0 ? void 0 : interactive.list_reply) === null || _b === void 0 ? void 0 : _b.id) || ((_c = interactive === null || interactive === void 0 ? void 0 : interactive.button_reply) === null || _c === void 0 ? void 0 : _c.id);
            if (replyId === "form_1") {
                const data = {
                    phoneNumber,
                    email,
                    concept: "Pago no validado",
                    uri,
                    text: `Datos ingresado \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Monto*: ${amount}`,
                };
                console.log("🚀 ~ formZelle ~ data:", data);
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
                return yield (0, send_message_text_1.default)(phoneNumber, messages_1.dbMessages.form.zelle.reference.message);
            }
        }
        else {
            return yield (0, send_message_interactive_1.default)(phoneNumber, {
                type: "button",
                body: {
                    text: `Ingresaste los siguiente datos: \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Monto*: ${amount}`,
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
    }
    return;
});
exports.default = formZelle;
//# sourceMappingURL=form-zelle.js.map