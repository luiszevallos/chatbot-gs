"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validAmount = exports.validNumberPhone = exports.validLocator = exports.validReference = void 0;
const validReference = (text) => {
    if (text.length < 6) {
        return "La referencia debe de ser mayor de 6 caracteres";
    }
    return false;
};
exports.validReference = validReference;
const validLocator = (text) => {
    if (text.length !== 6) {
        return "El localizador debe de ser igual a 6 letras";
    }
    if (/[0-9]/.test(text)) {
        return "El localizador no debe de contener número";
    }
    return false;
};
exports.validLocator = validLocator;
const validNumberPhone = (text) => {
    if (text.length < 10) {
        return "Debe de ser un Número de teléfono valido";
    }
    if (/[a-zA-Z]\w+\w/.test(text)) {
        return "El número de teléfono no debe incluir letras";
    }
    return false;
};
exports.validNumberPhone = validNumberPhone;
const validAmount = (text) => {
    if (/[a-zA-Z]\w+\w/.test(text)) {
        return "El monto no debe incluir letras";
    }
    return false;
};
exports.validAmount = validAmount;
//# sourceMappingURL=valid-field.js.map