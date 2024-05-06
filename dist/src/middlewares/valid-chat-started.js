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
Object.defineProperty(exports, "__esModule", { value: true });
//\
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const messages_1 = require("../db/messages");
const helpers_2 = require("../helpers");
const ValidChatStarted = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req;
    try {
        if (message) {
            const phoneNumber = message.from;
            const chat = yield models_1.ChatModels.findOne({
                where: {
                    phoneNumber,
                    open: true,
                },
            });
            if (!chat) {
                // ? Valida si el texto enviado es un correo validado
                if ((0, helpers_2.validEmail)(message.text.body)) {
                    // TODO: aquí va la petición para validar existencia de correo
                    const email = message.text.body;
                    yield models_1.ChatModels.create({
                        phoneNumber,
                        email,
                    });
                    next();
                }
                else {
                    // ? envía mensaje de bienvenida solicitando el correo
                    yield (0, helpers_1.sendMessageText)(message.from, messages_1.dbMessages.greeting.message);
                    return res.sendStatus(200);
                }
            }
            else if ((0, helpers_1.validateCreationDate)(chat.dataValues.createdAt)) {
                next();
            }
            else {
                yield chat.update({
                    open: false,
                });
                yield (0, helpers_1.sendMessageText)(message.from, messages_1.dbMessages.greeting.message);
                return res.sendStatus(200);
            }
        }
    }
    catch (error) {
        console.log("🚀 ~ error:", error);
        res.sendStatus(500);
    }
});
exports.default = ValidChatStarted;
//# sourceMappingURL=valid-chat-started.js.map