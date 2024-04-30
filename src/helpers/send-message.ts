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
