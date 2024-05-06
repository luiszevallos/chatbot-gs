"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbMessages = void 0;
exports.dbMessages = {
    greeting: {
        type: "text",
        message: `*¡Hola!* \nBienvenido al Soporte del validador de pago \n\nPor favor ingrese su correo electrónico \n\(Ej: example@mail.com)`,
    },
    form: {
        locator: {
            type: "text",
            message: `Por favor ingresa el localizador \n\n(Ej: 123456)`,
        },
        reference: {
            type: "text",
            message: `Por favor ingresa el número de referencia \n\n(EJ: 123456)`,
        },
        amount: {
            type: "text",
            message: `Por favor ingresa el monto \n\n(EJ: 1000,00)`,
        },
    },
    support: {
        type: "text",
        message: "Pronto lo estaremos contactando",
    },
    main: {
        type: "button",
        body: {
            text: `¿En qué puedo ayudarte? \n\nSelecciona una opción`,
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
                        id: "2",
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
                    type: "7",
                    reply: {
                        id: "42",
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
    // welcome: {
    //
    // },
    // resolved3: {
    //   type: "button",
    //   body: {
    //     text: `¿Resolví tu duda?`,
    //   },
    //   action: {
    //     buttons: [
    //       {
    //         type: "reply",
    //         reply: {
    //           id: "31",
    //           title: "Si",
    //         },
    //       },
    //       {
    //         type: "reply",
    //         reply: {
    //           id: "32",
    //           title: "No",
    //         },
    //       },
    //     ],
    //   },
    // },
    // // ? next 2
    // response: {
    //   // ? Response 1 --> 11 --> 111
    //   res1: {
    //     type: "button",
    //     body: {
    //       text: `¿Está registrado en la plataforma?`,
    //     },
    //     action: {
    //       buttons: [
    //         {
    //           type: "reply",
    //           reply: {
    //             id: "11",
    //             title: "Si",
    //           },
    //         },
    //         {
    //           type: "reply",
    //           reply: {
    //             id: "12",
    //             title: "No",
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   res11: {
    //     type: "button",
    //     body: {
    //       text: `¿Ha ingresado anteriormente a la plataforma?`,
    //     },
    //     action: {
    //       buttons: [
    //         {
    //           type: "reply",
    //           reply: {
    //             id: "111",
    //             title: "Si",
    //           },
    //         },
    //         {
    //           type: "reply",
    //           reply: {
    //             id: "112",
    //             title: "No",
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   res12: {
    //     type: "text",
    //     message: "Solicite agregar un nuevo operador a una oficina",
    //   },
    //   res111: {
    //     type: "text",
    //     message: "Pronto lo estaremos contactando.",
    //   },
    //   res112: {
    //     type: "text",
    //     message: "Pronto lo estaremos contactando.",
    //   },
    //   // ? response 2
    //   res2: {
    //     type: "list",
    //     body: {
    //       text: `No visualizo el pago`,
    //     },
    //     action: {
    //       button: "Menu",
    //       sections: [
    //         {
    //           title: "No visualizo el pago",
    //           rows: [
    //             {
    //               id: "21",
    //               title: "Zelle",
    //               description: "No visualizo pago en Zelle",
    //             },
    //             {
    //               id: "22",
    //               title: "Pago móvil",
    //               description: "No visualizo pago móvil",
    //             },
    //             {
    //               id: "23",
    //               title: "Sin localizador",
    //               description: "Cliente no coloco el localizador",
    //             },
    //             {
    //               id: "24",
    //               title: "¿Cómo valido un pago?",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    //   res21: {
    //     type: "text",
    //     message: `*Si buscas un pago Zelle:* \n\nDirígete a la pestaña "Todos". \nEn el área de búsqueda, ingresa: \n - Moneda: "USD". \n - Método de pago: "Zelle". \n - En la lupa "Buscar referencia o concepto..", coloca la referencia o concepto del pago`,
    //   },
    //   res22: {
    //     type: "text",
    //     message: `*Si buscas un Pago Móvil:* \n\nDirígete a la pestaña "Todos". \nEn el área de búsqueda, ingresa: \n - Moneda: "Ves".  \n - Método de pago: "Pago móvil".  \n - En la lupa "Buscar referencia o concepto..", coloca la referencia o concepto del pago. `,
    //   },
    //   res23: {
    //     type: "text",
    //     message: `*CLIENTE NO COLOCO EL LOCALIZADOR:* \nSi el cliente no colocó el localizador en el concepto, lo ingresó de forma errónea o incluyó texto adicional, el pago no se validará automáticamente. En este caso, aparecerá en la pestaña "Por Validar" y deberá validarse manualmente. `,
    //   },
    //   res24: {
    //     type: "text",
    //     message: `*¿CÓMO VALIDO UN PAGO?* \nLos pagos suelen validarse automáticamente si el cliente ingresó solo el número de localizador de seis dígitos en el concepto. De lo contrario, el pago pasará a "Pagos por validar" y deberás seguir estos pasos:  \nBusca el pago usando los filtros de búsqueda.  \nUna vez localizado, haz clic en los tres puntos verticales y luego en "Validar".  \nIngresa el localizador de seis dígitos asociado al pago.  \nHaz clic en el botón "Validar".  \nTu pago pasará a la lista de pagos validados manualmente.`,
    //   },
    //   // ? response 3
    //   res3: {
    //     type: "text",
    //     message: `*PAGOS NO ACTUALIZADOS:* \n\nPara verificar si un pago fue validado, dirígete a la pestaña "Validados automático" y en la sección de búsqueda ingresa:  \n - Moneda: "USD" o "Ves"  \n - En la lupa "Buscar referencia o concepto..", coloca la referencia o concepto del pago.  \n\nSi no aparece allí, deberás buscarlo en la pestaña "Por Validar" y si aun no lo visualizas, espera de 2 a 5 min en que aparezca, puede ocurrir lentitud en la red del banco para recibir los pagos.`,
    //   },
    //   // ? form
    //   confirm: {
    //     type: "text",
    //     message: "Pronto lo estaremos contactando",
    //   },
    // },
};
//# sourceMappingURL=messages.js.map