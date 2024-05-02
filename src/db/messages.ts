import { IDB } from "../types/webhook";

export const dbMessages: IDB = {
  list: {
    welcome: {
      type: "list",
      header: {
        type: "text",
        text: "¡Hola! \nTe doy la bienvenida al soporte del Validador",
      },
      body: {
        text: `¿En qué puedo ayudarte hoy?`,
      },
      footer: {
        text: "Estoy aquí para guiarte y resolver cualquier duda que tengas sobre la aplicación. Puedes preguntarme sobre:",
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
