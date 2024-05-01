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
// import axios, { endpoints } from "../utils/axios";
// import { IMessage } from "../types/webhook";
const markAsRead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { object, entry } = req.body;
    // if (object && entry) {
    //   const messages = entry[0]?.changes[0]?.value?.messages || [];
    //   await Promise.all(
    //     messages.map(async (message: IMessage) => {
    //       await axios.put(`${endpoints.messages}/${message.id}`);
    //     })
    //   );
    // }
    next();
});
exports.default = markAsRead;
//# sourceMappingURL=mark-as-read.js.map