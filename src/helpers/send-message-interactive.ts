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
    interactive,
  });
};

export default sendMessageInteractive;
