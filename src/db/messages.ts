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
              title: "No Puedo Ingresar",
            },
            {
              id: "2",
              title: "No visualizo el Pago",
            },
            {
              id: "3",
              title: "Pagos no actualizados",
            },
            {
              id: "4",
              title: "Terminar la Conversación",
            },
          ],
        },
      ],
    },
  },
  response: {
    "2": {
      type: "list",
      body: {
        text: `No visualizo el Pago`,
      },
      action: {
        button: "Menu",
        sections: [
          {
            title: "No visualizo el Pago",
            rows: [
              {
                id: "11",
                title: "Zelle Respuesta",
              },
              {
                id: "12",
                title: "Pago móvil Respuesta",
              },
              {
                id: "13",
                title: "Sin localizador",
                description: "Cliente no coloco el Localizador",
              },
              {
                id: "14",
                title: "Como valido un pago",
              },
            ],
          },
        ],
      },
    },
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
                id: "21",
                title: "Visualizar pagos",
                description: "Donde veo los pagos de un cliente",
              },
              {
                id: "22",
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
