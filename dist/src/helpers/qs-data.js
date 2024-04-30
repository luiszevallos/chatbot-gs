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
const qs_1 = __importDefault(require("qs"));
const config_global_1 = require("../../config-global");
const QSData = (destination, message) => __awaiter(void 0, void 0, void 0, function* () {
    return qs_1.default.stringify({
        "src.name": "", // TODO POR DEFINIR
        source: config_global_1.NUMBER_PHONE,
        channel: "whatsapp",
        //
        destination: destination,
        message: message,
    });
});
exports.default = QSData;
//# sourceMappingURL=qs-data.js.map