"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importStar(require("../utils/axios"));
const sendMessageContacts = (to // ? usuario que recibe mensaje
// interactive: IInteractiveList | IInteractiveButton // ? mensaje interactivo que se envía a usuario
) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.post(axios_1.endpoints.messages, {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
            type: "flow",
            header: {
                type: "text",
                text: "Flow message header",
            },
            body: {
                text: "Flow message body",
            },
            footer: {
                text: "Flow message footer",
            },
            action: {
                name: "flow",
                parameters: {
                    flow_message_version: "3",
                    flow_token: "AQAAAAACS5FpgQ_cAAAAAD0QI3s.",
                    flow_id: "1",
                    flow_cta: "Book!",
                    flow_action: "navigate",
                    flow_action_payload: {
                        screen: "<SCREEN_NAME>",
                        data: {
                            product_name: "name",
                            product_description: "description",
                            product_price: 100,
                        },
                    },
                },
            },
        },
    });
});
exports.default = sendMessageContacts;
//# sourceMappingURL=send-message-contacts.js.map