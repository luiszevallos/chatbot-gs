"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbMessages = void 0;
exports.dbMessages = {
    greeting: {
        type: "text",
        message: `*¡Hola!* \nBienvenido al Soporte del validador de pago \n\nPor favor ingrese su correo electrónico \n\(Ej: example@mail.com)`,
    },
    support: {
        type: "text",
        message: "Estamos aperturando un ticket, pronto lo estaremos contactando",
    },
    main: {
        type: "button",
        body: {
            text: `¿En qué puedo ayudarte?`,
        },
        action: {
            buttons: [
                {
                    type: "reply",
                    reply: {
                        id: "1",
                        title: "No puedo ingresar",
                    },
                },
                {
                    type: "reply",
                    reply: {
                        id: "2",
                        title: "No visualizo el pago",
                    },
                },
                {
                    type: "reply",
                    reply: {
                        id: "3",
                        title: "Otro",
                    },
                },
            ],
        },
    },
    continue: {
        type: "button",
        body: {
            text: `¿Hay algo más en lo que podamos ayudarle?`,
        },
        action: {
            buttons: [
                {
                    type: "reply",
                    reply: {
                        id: "6",
                        title: "Si",
                    },
                },
                {
                    type: "reply",
                    reply: {
                        id: "7",
                        title: "No",
                    },
                },
            ],
        },
    },
    bye: {
        type: "text",
        message: "Gracias por contactarnos. Ha sido un placer atenderle.",
    },
    resolveDoubt: {
        type: "button",
        body: {
            text: `¿Resolví tu duda?`,
        },
        action: {
            buttons: [
                {
                    type: "reply",
                    reply: {
                        id: "8",
                        title: "Si",
                    },
                },
                {
                    type: "reply",
                    reply: {
                        id: "32",
                        title: "No",
                    },
                },
            ],
        },
    },
    didNotDisplayPayment: {
        type: "list",
        body: {
            text: `No visualizo el pago \n\nseleccioné una opción`,
        },
        action: {
            button: "Menu",
            sections: [
                {
                    title: "No visualizo el pago",
                    rows: [
                        {
                            id: "11",
                            title: "Zelle",
                            description: "No visualizo un pago de Zelle",
                        },
                        {
                            id: "12",
                            title: "Pago móvil",
                            description: "No visualizo pago móvil",
                        },
                        {
                            id: "13",
                            title: "¿Cómo valido un pago?",
                        },
                    ],
                },
            ],
        },
    },
    visualizePaymentZelle: {
        type: "text",
        message: `*Si buscas un pago Zelle:* \nDirígete a la pestaña "Todos". \n\nEn el área de búsqueda, ingresa: \n - Moneda: "USD". \n - Método de pago: "Zelle". \n - En la lupa "Buscar referencia o concepto..", coloca la referencia o concepto del pago`,
    },
    visualizePaymentMobile: {
        type: "text",
        message: `*Si buscas un Pago Móvil:* \nDirígete a la pestaña "Todos". \n\nEn el área de búsqueda, ingresa: \n - Moneda: "Ves".  \n - Método de pago: "Pago móvil".  \n - En la lupa "Buscar referencia o concepto..", coloca la referencia o concepto del pago. `,
    },
    validatePayment: {
        type: "text",
        message: `*¿CÓMO VALIDO UN PAGO?* \nLos pagos suelen validarse automáticamente si el cliente ingresó solo el localizador de seis letras en el concepto. De lo contrario, el pago pasará a "Pagos por validar" y deberás seguir estos pasos:  \n\n- Busca el pago usando los filtros de búsqueda.  \n- Una vez localizado, haz clic en los tres puntos verticales y luego en "Validar".  \n- Ingresa el localizador de seis dígitos asociado al pago.  \n- Haz clic en el botón "Validar".  \n\nTu pago pasará a la lista de pagos validados manualmente.`,
    },
    resolveDoubtPaymentMobile: {
        type: "button",
        body: {
            text: `¿Resolví tu duda?`,
        },
        action: {
            buttons: [
                {
                    type: "reply",
                    reply: {
                        id: "8",
                        title: "Si",
                    },
                },
                {
                    type: "reply",
                    reply: {
                        id: "20",
                        title: "No",
                    },
                },
            ],
        },
    },
    resolveDoubtZelle: {
        type: "button",
        body: {
            text: `¿Resolví tu duda?`,
        },
        action: {
            buttons: [
                {
                    type: "reply",
                    reply: {
                        id: "8",
                        title: "Si",
                    },
                },
                {
                    type: "reply",
                    reply: {
                        id: "25",
                        title: "No",
                    },
                },
            ],
        },
    },
    typeBank: {
        type: "list",
        body: {
            text: "¿A qué banco se realizó el pago? \n\nseleccioné una opción",
        },
        action: {
            button: "Lista de bancos",
            sections: [
                {
                    title: "Bancos",
                    rows: [
                        {
                            id: "21",
                            title: "Bancamiga",
                            description: "BANCAMIGA BANCO UNIVERSAL, C.A.",
                        },
                        {
                            id: "22",
                            title: "BFC",
                            description: "BANCO FONDO COMÚN, C.A. BANCO UNIVERSAL.",
                        },
                        {
                            id: "23",
                            title: "Otro",
                        },
                    ],
                },
            ],
        },
    },
    otherBank: {
        type: "text",
        message: "Lo sentimos en este momento solo trabajamos con pago móvil de Bancamiga y BFC",
    },
    form: {
        other: {
            description: {
                type: "text",
                message: "Describa su problema",
            },
            uri: {
                type: "text",
                message: "Por favor envié una imagen de su caso",
            },
        },
        zelle: {
            locator: {
                type: "text",
                message: `Por favor ingresa el localizador \n\n(Ej: ABCDEF)`,
            },
            reference: {
                type: "text",
                message: `Por favor ingresa la referencia \n\n(EJ: 123456)`,
            },
            amount: {
                type: "text",
                message: `Por favor ingresa el monto \n\n(EJ: 1000.00)`,
            },
            uri: {
                type: "text",
                message: "Por favor enviar comprobante de pago",
            },
        },
        paymentMobile: {
            locator: {
                type: "text",
                message: `Por favor ingresa el localizador \n\n(Ej: ABCDEF)`,
            },
            reference: {
                type: "text",
                message: `Por favor ingresa el número de referencia \n\n(EJ: 123456)`,
            },
            amount: {
                type: "text",
                message: `Por favor ingresa el monto \n\n(EJ: 1000.00)`,
            },
            issuerNumber: {
                type: "text",
                message: "Por favor ingresa número de teléfono de donde se realizo el pago \n\n(Ej: 04*********)",
            },
            bank: {
                type: "text",
                message: "Por favor ingresa banco de donde se realizo el pago",
            },
            uri: {
                type: "text",
                message: "Por favor enviar comprobante de pago",
            },
        },
    },
};
//# sourceMappingURL=messages.js.map