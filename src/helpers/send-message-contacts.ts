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
      type: "flow",
      header: {
        type: "text",
        text: "Flow message header",
      },
      body: {
        text: "Flow message body",
      },
      footer: {
        text: "Flow message footer",
      },
      action: {
        name: "flow",
        parameters: {
          flow_message_version: "3",
          flow_token: "AQAAAAACS5FpgQ_cAAAAAD0QI3s.",
          flow_id: "1",
          flow_cta: "Book!",
          flow_action: "navigate",
          flow_action_payload: {
            screen: "<SCREEN_NAME>",
            data: {
              product_name: "name",
              product_description: "description",
              product_price: 100,
            },
          },
        },
      },
    },
  });
};

export default sendMessageContacts;
