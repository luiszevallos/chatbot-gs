import { IInteractiveButton, IInteractiveList } from "../types/webhook";
import axios, { endpoints } from "../utils/axios";

const sendMessageContacts = async (
  to: string // ? usuario que recibe mensaje
  // interactive: IInteractiveList | IInteractiveButton // ? mensaje interactivo que se envía a usuario
) => {
  return await axios.post(endpoints.messages, {
    messaging_product: "whatsapp",
    to,
    type: "interactive",
    interactive: {
      type: "address_message",
      body: {
        text: "Thanks for your order! Tell us what address you’d like this order delivered to.",
      },
      action: {
        name: "address_message",
        parameters: {
          country: "IN",
          values: {
            name: "CUSTOMER_NAME",
            phone_number: "+91xxxxxxxxxx",
          },
        },
      },
    },
  });
};

export default sendMessageContacts;
