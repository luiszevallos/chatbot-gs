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
          title: "Preguntas",
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
        button: "lista",
        sections: [
          {
            title: "Lista",
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
  },
};
