import axios, { endpoints } from "../utils/axios";

type IButton = {
  type: string;
  reply: {
    id: string;
    title: string;
  };
};

export const sendMessageText = async (to: string, message: string) => {
  return await axios.post(endpoints.messages, {
    to,
    type: "text",
    messaging_product: "whatsapp",
    text: {
      body: message,
    },
  });
};

export const sendMessageInteractiveButton = async (
  to: string,
  message: string,
  buttons: IButton[]
) => {
  return await axios.post(endpoints.messages, {
    messaging_product: "whatsapp",
    type: "interactive",
    to,
    interactive: {
      type: "button",
      body: {
        text: message,
      },
      action: {
        buttons,
      },
    },
  });
};

export const sendMessageInteractiveList = async (
  to: string,
  message: string
) => {
  return await axios.post(endpoints.messages, {
    messaging_product: "whatsapp",
    type: "interactive",
    to,
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "HEADER_TEXT",
      },
      body: {
        text: "BODY_TEXT",
      },
      footer: {
        text: "FOOTER_TEXT",
      },
      action: {
        button: "BUTTON_TEXT",
        sections: [
          {
            title: "SECTION_1_TITLE",
            rows: [
              {
                id: "SECTION_1_ROW_1_ID",
                title: "SECTION_1_ROW_1_TITLE",
                description: "SECTION_1_ROW_1_DESCRIPTION",
              },
              {
                id: "SECTION_1_ROW_2_ID",
                title: "SECTION_1_ROW_2_TITLE",
                description: "SECTION_1_ROW_2_DESCRIPTION",
              },
            ],
          },
          {
            title: "SECTION_2_TITLE",
            rows: [
              {
                id: "SECTION_2_ROW_1_ID",
                title: "SECTION_2_ROW_1_TITLE",
                description: "SECTION_2_ROW_1_DESCRIPTION",
              },
              {
                id: "SECTION_2_ROW_2_ID",
                title: "SECTION_2_ROW_2_TITLE",
                description: "SECTION_2_ROW_2_DESCRIPTION",
              },
            ],
          },
        ],
      },
    },
  });
};
