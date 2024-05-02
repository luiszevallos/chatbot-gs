import axios, { endpoints } from "../utils/axios";

type IRow = {
  id: string;
  title: string;
  description?: string;
};

type ISection = {
  title?: string;
  rows: IRow[];
};

const sendMessageInteractiveList = async (
  to: string,
  message: string,
  sections: ISection[]
) => {
  return await axios.post(endpoints.messages, {
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
        button: "Lista",
        sections,
      },
    },
  });
};

export default sendMessageInteractiveList;
