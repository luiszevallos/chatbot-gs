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
const formOther = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, from: phoneNumber, image } = message;
    const formSupport = yield models_1.FormSupportModels.findOne({
        where: {
            phoneNumber,
            open: true,
        },
    });
    if (formSupport) {
        const { other } = messages_1.dbMessages.form;
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
            yield formSupport.update({
                uri: response.data.url,
                open: false,
                send: true,
            });
            return yield (0, send_message_interactive_1.default)(phoneNumber, {
                type: "button",
                body: {
                    text: `Ingresaste los siguiente datos: \n\n*Descripción*: ${description} \n 1 - Imagen adjuntada`,
                },
                footer: {
                    text: "¿Esto es correcto?",
                },
                action: {
                    buttons: [
                        {
                            type: "reply",
                            reply: {
                                id: "5",
                                title: "Si",
                            },
                        },
                        {
                            type: "reply",
                            reply: {
                                id: "6",
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
exports.default = formOther;
//# sourceMappingURL=form-other.js.map