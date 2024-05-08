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
const validMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { object, entry } = req.body;
    try {
        if (object && (entry === null || entry === void 0 ? void 0 : entry.length) > 0 && ((_a = entry[0].changes) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const change = entry[0].changes[0];
            console.log("🚀 ~ change:", JSON.stringify(change.value.contacts[0].profile));
            if (change && ((_c = (_b = change === null || change === void 0 ? void 0 : change.value) === null || _b === void 0 ? void 0 : _b.messages) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                const message = change.value.messages[0];
                if (message) {
                    req.message = message;
                    next();
                }
                else {
                    return res.sendStatus(404);
                }
            }
        }
        else
            return res.sendStatus(404);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
exports.default = validMessage;
//# sourceMappingURL=valid-message.js.map