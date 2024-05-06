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
const helpers_1 = require("../helpers");
const messages_1 = require("../db/messages");
const axios_1 = __importDefault(require("../utils/axios"));
const openSupportForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req;
    if (message) {
        const formSupport = yield models_1.FormSupportModels.findOne({
            where: {
                phoneNumber: message.from,
                open: true,
            },
        });
        const { text, from, image } = message;
        if (formSupport) {
            const { type, description, uri, locator, reference, amount } = formSupport.dataValues;
            switch (type) {
                case "other":
                    if (!description && message.type !== "text") {
                        return yield (0, helpers_1.sendMessageText)(from, messages_1.dbMessages.other.message);
                    }
                    else if (!description) {
                        yield formSupport.update({ description: text.body });
                        return yield (0, helpers_1.sendMessageText)(from, messages_1.dbMessages.support.message);
                    }
                    else if (!uri && message.type !== "image") {
                        return yield (0, helpers_1.sendMessageText)(from, messages_1.dbMessages.support.message);
                    }
                    else if (!uri) {
                        const response = yield axios_1.default.get(`/${image.id}`);
                        console.log(response);
                    }
                    break;
                default:
                    break;
            }
            // if (!locator) {
            //   await formSupport.update({ locator: text.body });
            //   await sendMessageText(from, dbMessages.form.reference.message);
            // } else if (!reference) {
            //   await formSupport.update({ reference: text.body });
            //   await sendMessageText(from, dbMessages.form.amount.message);
            // } else if (!amount) {
            //   await formSupport.update({ amount: text.body });
            //   await sendMessageInteractive(from, {
            //     type: "button",
            //     body: {
            //       text: `Ingresaste los siguiente datos \n\n*Localizador*: ${locator} \n*Referencia*: ${reference} \n*Monto*: ${text.body} \n¿Esto es correcto?`,
            //     },
            //     action: {
            //       buttons: [
            //         {
            //           type: "reply",
            //           reply: {
            //             id: "form_1",
            //             title: "Si",
            //           },
            //         },
            //         {
            //           type: "reply",
            //           reply: {
            //             id: "form_2",
            //             title: "No",
            //           },
            //         },
            //       ],
            //     },
            //   });
            // }
            return res.sendStatus(200);
        }
    }
    next();
});
exports.default = openSupportForm;
//# sourceMappingURL=open-support-form.js.map