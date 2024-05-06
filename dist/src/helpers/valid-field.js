"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validAmount = exports.validNumberPhone = exports.validLocator = exports.validReference = void 0;
const validReference = (text) => {
    if (text.trim().length > 6) {
        return "La referencia debe de ser mayor de 6 caracteres";
    }
    return false;
};
exports.validReference = validReference;
const validLocator = (text) => {
    if (text.trim().length > 6) {
        return "El localizador debe de ser mayor de 6 caracteres";
    }
    return false;
};
exports.validLocator = validLocator;
const validNumberPhone = (text) => {
    if (text.trim().length > 10 || text.includes("58")) {
        return "Debe de ser un Número de teléfono valido";
    }
    return false;
};
exports.validNumberPhone = validNumberPhone;
const validAmount = (text) => {
    const currentAmount = text.replaceAll(",", ".");
    if (!Number(currentAmount)) {
        return "Debe de ser un monto valido";
    }
    return false;
};
exports.validAmount = validAmount;
//# sourceMappingURL=valid-field.js.map