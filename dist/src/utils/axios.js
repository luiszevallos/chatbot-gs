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
exports.endpoints = exports.fetcher = void 0;
const axios_1 = __importDefault(require("axios"));
const config_global_1 = require("../../config-global");
// ----------------------------------------------------------------------
const axiosInstance = axios_1.default.create({
    baseURL: `${config_global_1.HOST_API}/${config_global_1.NUMBER_PHONE_ID}`,
    headers: {
        Authorization: `Bearer ${config_global_1.HEADER_JWT}`,
    },
});
exports.default = axiosInstance;
// ----------------------------------------------------------------------
const fetcher = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = yield axiosInstance.get(url, Object.assign({}, config));
    return res.data;
});
exports.fetcher = fetcher;
// ----------------------------------------------------------------------
exports.endpoints = {
    messages: "/messages",
};
//# sourceMappingURL=axios.js.map