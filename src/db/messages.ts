export const dbMessages = {
  welcome: {
    message: `Hola! \nEs un gusto para nosotros poder atenderle. \nPara agilizar su requerimiento le invitamos a seleccionar una de la siguientes \nOpciones:`,
    buttons: [
      {
        type: "reply",
        reply: {
          id: "1",
          title: "Preguntas frecuentes",
        },
      },
      {
        type: "reply",
        reply: {
          id: "2",
          title: "Reportar incidencia",
        },
      },
    ],
  },
  //?
  frequent_questions: {
    header: {
      message: "Preguntas frecuentes",
    },
    list: [
      {
        title: "",
        rows: [
          {
            id: "11",
            title: "",
            description: "¿Cómo valido un pago?",
          },
          {
            id: "12",
            title: "",
            description: "¿Cómo sé si un pago fue validado?",
          },
          {
            id: "13",
            title: "",
            description: "¿Cómo veo el estado de una reserva?",
          },
          // {
          //   id: "14",
          //   title:
          //     "¿Qué hacer si el cliente no colocó el localizador en el concepto?",
          //   description: "",
          // },
          // {
          //   id: "15",
          //   title: "¿Dónde veo los pagos realizados por un cliente?",
          //   description: "",
          // },
        ],
      },
    ],
  },
};
