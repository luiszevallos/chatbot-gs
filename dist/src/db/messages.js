"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbMessages = void 0;
exports.dbMessages = {
    list: {
        welcome: {
            type: "list",
            header: {
                type: "text",
                text: "¡Hola! \nTe doy la bienvenida al soporte del Validador",
            },
            body: {
                text: `¿En qué puedo ayudarte hoy? \nEstoy aquí para guiarte y resolver cualquier duda que tengas sobre la aplicación. Puedes preguntarme sobre:`,
            },
            action: {
                button: "Preguntas frecuentes",
                sections: [
                    {
                        title: "Pago móvil",
                        rows: [
                            {
                                id: "11",
                                title: "No se visualiza el pago",
                            },
                        ],
                    },
                    {
                        title: "Zelle",
                        rows: [
                            {
                                id: "21",
                                title: "No se visualiza el pago",
                            },
                        ],
                    },
                ],
            },
        },
    },
};
//# sourceMappingURL=messages.js.map