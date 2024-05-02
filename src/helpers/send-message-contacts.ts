import { IInteractiveButton, IInteractiveList } from "../types/webhook";
import axios, { endpoints } from "../utils/axios";

const sendMessageContacts = async (
  to: string // ? usuario que recibe mensaje
  // interactive: IInteractiveList | IInteractiveButton // ? mensaje interactivo que se envía a usuario
) => {
  return await axios.post(endpoints.messages, {
    messaging_product: "whatsapp",
    to,
    type: "contacts",
    contacts: [
      {
        name: {
          formatted_name: "NAME",
          first_name: "FIRST_NAME",
          last_name: "LAST_NAME",
          middle_name: "MIDDLE_NAME",
          suffix: "SUFFIX",
          prefix: "PREFIX",
        },
      },
    ],
  });
};

export default sendMessageContacts;
