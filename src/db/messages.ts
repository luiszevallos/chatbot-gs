import { IDB } from "../types/webhook";

export const dbMessages: IDB = {
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
            // {
            //   id: "4",
            //   title: "Terminar la conversación",
            // },
          ],
        },
      ],
    },
  },
  continueConversation: {
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
  goodBye: {
    type: "text",
    message: "Gracias por contactarnos. Ha sido un placer atenderle.",
  },

  // ? next 2
  response: {
    // ? Response 1 --> 11 --> 111
    res1: {
      type: "button",
      body: {
        text: `¿Está registrado en la plataforma?`,
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "11",
              title: "Si",
            },
          },
          {
            type: "reply",
            reply: {
              id: "12",
              title: "No",
            },
          },
        ],
      },
    },
    res11: {
      type: "button",
      body: {
        text: `¿Ha ingresado anteriormente a la plataforma?`,
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "111",
              title: "Si",
            },
          },
          {
            type: "reply",
            reply: {
              id: "112",
              title: "No",
            },
          },
        ],
      },
    },
    res12: {
      type: "text",
      message: "Solicite agregar un nuevo operador a una oficina",
    },
    res111: {
      type: "text",
      message: "Pronto lo estaremos contactando.",
    },
    res112: {
      type: "text",
      message: "Pronto lo estaremos contactando.",
    },

    // ? response 2
    res2: {
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
    res21: {
      type: "text",
      message: `*Si buscas un pago Zelle:* \n\nDirígete a la pestaña "Todos". \nEn el área de búsqueda, ingresa: \n - Moneda: "USD". \n - Método de pago: "Zelle". \n - En la lupa "Buscar referencia o concepto..", coloca la referencia o concepto del pago`,
    },
    res22: {
      type: "text",
      message: `*Si buscas un Pago Móvil:* \n\nDirígete a la pestaña "Todos". \nEn el área de búsqueda, ingresa: \n - Moneda: "Ves".  \n - Método de pago: "Pago móvil".  \n - En la lupa "Buscar referencia o concepto..", coloca la referencia o concepto del pago. `,
    },
    res23: {
      type: "text",
      message: `*CLIENTE NO COLOCO EL LOCALIZADOR:* \nSi el cliente no colocó el localizador en el concepto, lo ingresó de forma errónea o incluyó texto adicional, el pago no se validará automáticamente. En este caso, aparecerá en la pestaña "Por Validar" y deberá validarse manualmente. `,
    },
    res24: {
      type: "text",
      message: `*¿CÓMO VALIDO UN PAGO?* \nLos pagos suelen validarse automáticamente si el cliente ingresó solo el número de localizador de seis dígitos en el concepto. De lo contrario, el pago pasará a "Pagos por validar" y deberás seguir estos pasos:  \nBusca el pago usando los filtros de búsqueda.  \nUna vez localizado, haz clic en los tres puntos verticales y luego en "Validar".  \nIngresa el localizador de seis dígitos asociado al pago.  \nHaz clic en el botón "Validar".  \nTu pago pasará a la lista de pagos validados manualmente.`,
    },

    // ? response 3
    res3: {
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
                description:
                  "Cuanto tiempo debo esperar para visualizar un pago.",
              },
            ],
          },
        ],
      },
    },
  },
};
