import { IInteractiveButton, IInteractiveList } from "../types/webhook";
import axios, { endpoints } from "../utils/axios";

const sendMessageContacts = async (
  to: string // ? usuario que recibe mensaje
  // interactive: IInteractiveList | IInteractiveButton // ? mensaje interactivo que se envía a usuario
) => {
  return await axios.post(endpoints.messages, {
    messaging_product: "whatsapp",
    to,
    contacts: [
      {
        input: "16505555555",
        wa_id: "16505555555",
      },
    ],
    messages: [
      {
        id: "wamid.HBgLMTY1MDUwNzY1MjAVAgARGBI5QTNDQTVCM0Q0Q0Q2RTY3RTcA",
        message_status: "accepted",
      },
    ],
  });
};

export default sendMessageContacts;
