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
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const messages_1 = require("../db/messages");
const openSupportForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req;
    if (message) {
        const formSupport = yield models_1.FormSupportModels.findOne({
            where: {
                phoneNumber: message.from,
                open: true,
            },
        });
        const { text, from } = message;
        if (formSupport && message.type === "text") {
            const { locator, reference, amount } = formSupport.dataValues;
            if (!locator) {
                yield formSupport.update({ locator: text.body });
                yield (0, helpers_1.sendMessageText)(from, messages_1.dbMessages.form.reference.message);
            }
            else if (!reference) {
                yield formSupport.update({ reference: text.body });
                yield (0, helpers_1.sendMessageText)(from, messages_1.dbMessages.form.amount.message);
            }
            else if (!amount) {
                yield formSupport.update({ amount: text.body });
                yield (0, helpers_1.sendMessageInteractive)(from, {
                    type: "button",
                    body: {
                        text: `Ingresaste los siguiente datos \n\n*Localizador*: ${locator} \n*Referencia*: ${reference} \n*Monto*: ${text.body} \n¿Esto es correcto?`,
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
            return res.sendStatus(200);
        }
    }
    next();
});
exports.default = openSupportForm;
//# sourceMappingURL=open-support-form.js.map