import { CAPTION } from "../../config-global";

export const messages = {
  welcome: {
    content: {
      type: "text",
      text: "Hola, \nBienvenido a chatbot. \nPara agilizar su requerimiento le invitamos a seleccionar una de las siguientes \nOpciones",
      caption: CAPTION,
    },
    type: "quick_reply",
    msgid: "21",
    options: [
      { type: "text", title: "Preguntas frecuente", postbackText: "1" },
      { type: "text", title: "Reportar incidencia", postbackText: "2" },
      { type: "text", title: "Terminar la conversación", postbackText: "2" },
    ],
  },
};
