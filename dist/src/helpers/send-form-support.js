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
exports.sendFormSupport = exports.dataFormSupport = void 0;
const models_1 = require("../models");
const dataFormSupport = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield models_1.FormSupportModels.findOne({
        where: {
            phoneNumber,
            open: false,
            send: true,
        },
    });
    if (form) {
        yield form.update({ send: false });
        const { type, description, phoneNumber, email, uri, bank, reference, locator, issuerNumber, amount, } = form.dataValues;
        switch (type) {
            case "other":
                return {
                    concept: "Otro",
                    description,
                    phoneNumber,
                    email,
                    uri,
                };
            case "paymentMobile":
                return {
                    phoneNumber,
                    email,
                    concept: "Pago móvil no validado",
                    uri,
                    description: `Datos ingresado \n\n*Banco*: ${bank} \n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Número emisor*: ${issuerNumber} \n*Monto*: ${amount}`,
                };
            case "zelle":
                return {
                    phoneNumber,
                    email,
                    concept: "Pago Zelle no validado",
                    uri,
                    description: `Datos ingresado \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Monto*: ${amount}`,
                };
            default:
                return null;
        }
    }
    return null;
});
exports.dataFormSupport = dataFormSupport;
const sendFormSupport = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: conexión con soporte
        console.log("🚀 ~ sendFormSupport ~ data:", data);
        // const response = await axios.post(`${HOST_API_SUPPORT}`, data);
        // return response.data;
        return;
    }
    catch (error) {
        throw new Error(`${(error === null || error === void 0 ? void 0 : error.message) || error}`);
    }
});
exports.sendFormSupport = sendFormSupport;
//# sourceMappingURL=send-form-support.js.map