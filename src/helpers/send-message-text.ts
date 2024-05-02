import axios, { endpoints } from "../utils/axios";

const sendMessageText = async (to: string, message: string) => {
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
