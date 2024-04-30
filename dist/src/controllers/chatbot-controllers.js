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
exports.getChatbot = void 0;
const getChatbot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = req.body;
    console.log("🚀 ~ getChatbot ~ payload:", payload);
    // const { type, text, source } = payload;
    // switch (type) {
    //   case "list_reply":
    //     break;
    //   case "button_reply":
    //     break;
    //   case "text":
    //     if (text) {
    //       const data = QSData(source, `${messages.welcome}`);
    //       console.log(data);
    //       return res.status(200).json({
    //         message: messages.welcome,
    //       });
    //     }
    //   default:
    //     break;
    // }
    res.status(200).json({
        message: "Conectado a bot",
    });
});
exports.getChatbot = getChatbot;
//# sourceMappingURL=chatbot-controllers.js.map