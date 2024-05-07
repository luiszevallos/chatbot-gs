"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateCreationDate = (date) => {
    const then = new Date(date);
    const now = new Date();
    const msBetweenDates = Math.abs(then.getTime() - now.getTime());
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    return hoursBetweenDates < 2; // ? 1 hora para reiniciar el chat
};
exports.default = validateCreationDate;
//# sourceMappingURL=validate-creation-date.js.map