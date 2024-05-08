import axios, { endpoints } from "../utils/axios";

const sendMessageText = async (to: string, message: string) => {
  // ? response mensaje solo texto
  return await axios.post(endpoints.messages, {
    to,
    type: "text",
    messaging_product: "whatsapp",
    text: {
      body: message,
    },
  });
};

export default sendMessageText;
