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
const resMessageInteractiveButtons = (_a) => __awaiter(void 0, [_a], void 0, function* ({ from, interactive, }) {
    var _b;
    try {
        switch ((_b = interactive === null || interactive === void 0 ? void 0 : interactive.button_reply) === null || _b === void 0 ? void 0 : _b.id) {
            // ? Pregunta frecuente
            case "1":
            // const { sections } = dbMessages.frequent_questions;
            // return await sendMessageInteractiveList(
            //   from,
            //   "Preguntas frecuente",
            //   sections
            // );
            default:
                return;
        }
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.default = resMessageInteractiveButtons;
//# sourceMappingURL=res-message-interactive-buttons.js.map