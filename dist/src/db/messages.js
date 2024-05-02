"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbMessages = void 0;
exports.dbMessages = {
    welcome: {
        type: "list",
        header: {
            type: "text",
            text: "¡Hola! \nTe doy la bienvenida al soporte del Validador",
        },
        body: {
            text: `¿En qué puedo ayudarte hoy? \nEstoy aquí para guiarte y resolver cualquier duda que tengas sobre la aplicación. \nPuedes preguntarme sobre:`,
        },
        action: {
            button: "Preguntas frecuentes",
            sections: [
                {
                    title: "Preguntas",
                    rows: [
                        {
                            id: "response_1",
                            title: "No Puedo Ingresar",
                        },
                        {
                            id: "response_2",
                            title: "No visualizo el Pago",
                        },
                        {
                            id: "response_3",
                            title: "Pagos no actualizados",
                        },
                        {
                            id: "response_4",
                            title: "Terminar la Conversación",
                        },
                    ],
                },
            ],
        },
    },
    response: {
        res_2: {
            type: "list",
            body: {
                text: `No visualizo el Pago`,
            },
            action: {
                button: "lista",
                sections: [
                    {
                        title: "Lista",
                        rows: [
                            {
                                id: "response_11",
                                title: "Zelle Respuesta",
                            },
                            {
                                id: "response_12",
                                title: "Pago móvil Respuesta",
                            },
                            {
                                id: "response_13",
                                title: "Sin localizador",
                                description: "Cliente no coloco el Localizador",
                            },
                            {
                                id: "response_14",
                                title: "Como valido un pago",
                            },
                        ],
                    },
                ],
            },
        },
    },
};
//# sourceMappingURL=messages.js.map