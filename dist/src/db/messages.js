"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
const config_global_1 = require("../../config-global");
exports.messages = {
    welcome: {
        content: {
            type: "text",
            text: "Hola, \nBienvenido a chatbot. \nPara agilizar su requerimiento le invitamos a seleccionar una de las siguientes \nOpciones",
            caption: config_global_1.CAPTION,
        },
        type: "quick_reply",
        msgid: "21",
        options: [
            { type: "text", title: "Preguntas frecuente", postbackText: "1" },
            { type: "text", title: "Reportar incidencia", postbackText: "2" },
            { type: "text", title: "Terminar la conversación", postbackText: "2" },
        ],
    },
};
//# sourceMappingURL=messages.js.map