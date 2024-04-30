"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbMessages = void 0;
exports.dbMessages = {
    welcome: {
        message: `Hola! \nEs un gusto para nosotros poder atenderle. \nPara agilizar su requerimiento le invitamos a seleccionar una de la siguientes \nOpciones:`,
        buttons: [
            {
                type: "reply",
                reply: {
                    id: "1",
                    title: "Pregunta frecuente",
                },
            },
            {
                type: "reply",
                reply: {
                    id: "2",
                    title: "Reportar incidencia",
                },
            },
        ],
    },
};
//# sourceMappingURL=messages.js.map