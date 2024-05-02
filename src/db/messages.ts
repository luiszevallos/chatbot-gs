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
                title: "No se actualizan los Pagos",
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
  },
};
