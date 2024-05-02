import axios, { endpoints } from "../utils/axios";

type IButton = {
  type: string;
  reply: {
    id: string;
    title: string;
  };
};

const sendMessageInteractiveButton = async (
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

export default sendMessageInteractiveButton;
