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
        if (formSupport) {
            const { type } = formSupport.dataValues;
            switch (type) {
                case "paymentMobile":
                    (0, helpers_1.formPaymentMobile)(message);
                    break;
                case "other":
                    (0, helpers_1.formOther)(message);
                    break;
                default:
                    break;
            }
            return res.sendStatus(200);
        }
    }
    next();
});
exports.default = openSupportForm;
//# sourceMappingURL=open-support-form.js.map