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
                    title: "Preguntas frecuente",
                    rows: [
                        {
                            id: "1",
                            title: "No puedo ingresar",
                        },
                        {
                            id: "2",
                            title: "No visualizo el pago",
                        },
                        {
                            id: "3",
                            title: "Pagos no actualizados",
                        },
                        {
                            id: "4",
                            title: "Terminar la conversación",
                        },
                    ],
                },
            ],
        },
    },
    response: {
        // ? response 2
        "2": {
            type: "list",
            body: {
                text: `No visualizo el pago`,
            },
            action: {
                button: "Menu",
                sections: [
                    {
                        title: "No visualizo el pago",
                        rows: [
                            {
                                id: "21",
                                title: "Zelle",
                                description: "No visualizo pago en Zelle",
                            },
                            {
                                id: "22",
                                title: "Pago móvil",
                                description: "No visualizo pago móvil",
                            },
                            {
                                id: "23",
                                title: "Sin localizador",
                                description: "Cliente no coloco el localizador",
                            },
                            {
                                id: "24",
                                title: "Como valido un pago",
                            },
                        ],
                    },
                ],
            },
        },
        // ? response 3
        "3": {
            type: "list",
            body: {
                text: `Pagos no actualizados`,
            },
            action: {
                button: "Menu",
                sections: [
                    {
                        title: "Pagos no actualizados",
                        rows: [
                            {
                                id: "31",
                                title: "Visualizar pagos",
                                description: "Donde veo los pagos de un cliente",
                            },
                            {
                                id: "32",
                                title: "Tiempo de espera",
                                description: "Cuanto tiempo debo esperar para visualizar un pago.",
                            },
                        ],
                    },
                ],
            },
        },
        // ? response 4
        "4": {
            type: "button",
            body: {
                text: `¿Hay algo más en lo que podamos ayudarle?`,
            },
            action: {
                buttons: [
                    {
                        type: "reply",
                        reply: {
                            id: "41",
                            title: "Si",
                        },
                    },
                    {
                        type: "reply",
                        reply: {
                            id: "42",
                            title: "No",
                        },
                    },
                ],
            },
        },
        "42": {
            message: "Gracias por contactarnos. Ha sido un placer atenderle.",
        },
    },
};
//# sourceMappingURL=messages.js.map