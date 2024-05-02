import { IInteractive } from "../types/webhook";
import axios, { endpoints } from "../utils/axios";

const sendMessageInteractive = async (
  to: string, // ? usuario que recibe mensaje
  interactive: IInteractive // ? mensaje interactivo que se envía a usuario
) => {
  return await axios.post(endpoints.messages, {
    messaging_product: "whatsapp",
    type: "interactive",
    to,
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "<MESSAGE_HEADER_TEXT",
      },
      body: {
        text: "<MESSAGE_BODY_TEXT>",
      },
      footer: {
        text: "<MESSAGE_FOOTER_TEXT>",
      },
      action: {
        sections: [
          {
            title: "<SECTION_TITLE_TEXT>",
            rows: [
              {
                id: "<ROW_ID>",
                title: "<ROW_TITLE_TEXT>",
                description: "<ROW_DESCRIPTION_TEXT>",
              },
            ],
          },
          {
            title: "<SECTION_TITLE_TEXT>",
            rows: [
              {
                id: "<ROW_ID>",
                title: "<ROW_TITLE_TEXT>",
                description: "<ROW_DESCRIPTION_TEXT>",
              },
            ],
          },
        ],
        button: "<BUTTON_TEXT>",
      },
    },
  });
};

export default sendMessageInteractive;
