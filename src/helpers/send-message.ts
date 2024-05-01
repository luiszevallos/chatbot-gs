import axios, { endpoints } from "../utils/axios";

type IButton = {
  type: string;
  reply: {
    id: string;
    title: string;
  };
};

type IRow = {
  id: string;
  title: string;
  description?: string;
};

type ISection = {
  title?: string;
  rows: IRow[];
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
  message: string,
  sections: ISection[],
  title?: string
) => {
  const data = {
    messaging_product: "whatsapp",
    type: "interactive",
    to,
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: message,
      },
      action: {
        button: title || message,
        sections,
      },
    },
  };
  console.log("🚀 ~ data:", data);
  return await axios.post(endpoints.messages, data);
};
