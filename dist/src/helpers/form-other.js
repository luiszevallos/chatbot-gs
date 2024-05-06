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
    return;
});
exports.default = formOther;
//# sourceMappingURL=form-other.js.map