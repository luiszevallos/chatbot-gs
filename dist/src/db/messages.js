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
        title: "Lista",
        header: {
            message: "Preguntas frecuentes",
        },
        sections: [
            {
                title: "Validador",
                rows: [
                    {
                        id: "11",
                        title: "Validar pago",
                        description: "¿Cómo valido un pago?",
                    },
                    {
                        id: "12",
                        title: "Estado de pago",
                        description: "¿Cómo sé si un pago fue validado?",
                    },
                    {
                        id: "13",
                        title: "Estado de reserva",
                        description: "¿Cómo veo el estado de una reserva?",
                    },
                ],
            },
        ],
    },
};
//# sourceMappingURL=messages.js.map