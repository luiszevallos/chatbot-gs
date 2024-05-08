import { IInteractiveButton, IInteractiveList } from "../types/webhook";
import axios, { endpoints } from "../utils/axios";

const sendMessageInteractive = async (
  to: string, // ? usuario que recibe mensaje
  interactive: IInteractiveList | IInteractiveButton // ? mensaje interactivo que se envía a usuario
) => {
  // ? response mensaje interactivo como lista y botones
  return await axios.post(endpoints.messages, {
    messaging_product: "whatsapp",
    type: "interactive",
    to,
    interactive,
  });
};

export default sendMessageInteractive;
