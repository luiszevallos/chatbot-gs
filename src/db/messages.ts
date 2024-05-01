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
    title: "Lista",
    header: {
      message: "Preguntas frecuentes",
    },
    sections: [
      {
        title: "Validador",
        rows: [
          {
            id: "11",
            title: "Validar pago",
            description: "",
          },
          {
            id: "12",
            title: "Pago no validado",
            description: "",
          },
          {
            id: "13",
            title: "Estado de reserva",
            description: "",
          },
        ],
      },
      {
        title: "Buscar pago",
        rows: [
          {
            id: "16",
            title: "Pago móvil",
            description: "",
          },
          {
            id: "17",
            title: "Pago Zelle",
            description: "",
          },
        ],
      },
    ],
  },
};
