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
                    title: "Preguntas frecuentes",
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
    //?
    frequent_questions: {
        sections: [
            {
                title: "",
                rows: [
                    {
                        id: "11",
                        title: "Pago no validado",
                    },
                    {
                        id: "12",
                        title: "Estado de reserva",
                    },
                ],
            },
        ],
    },
};
//# sourceMappingURL=messages.js.map