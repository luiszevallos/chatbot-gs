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
const openSupportForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req;
    if (message) {
        const formSupport = yield models_1.FormSupportModels.findOne({
            where: {
                phoneNumber: message.from,
                open: true,
            },
        });
        // ? Valida si existe un form de soporte abierto
        if (formSupport) {
            const { type } = formSupport.dataValues;
            switch (type) {
                case "paymentMobile":
                    yield (0, helpers_1.formPaymentMobile)(message);
                    return res.sendStatus(200);
                case "zelle":
                    yield (0, helpers_1.formZelle)(message);
                    return res.sendStatus(200);
                case "other":
                    yield (0, helpers_1.formOther)(message);
                    return res.sendStatus(200);
                default:
                    // ? se cierra form de soporte
                    formSupport.update({
                        open: false,
                        send: false,
                        canceled: true,
                    });
                    break;
            }
        }
    }
    next();
});
exports.default = openSupportForm;
//# sourceMappingURL=open-support-form.js.map