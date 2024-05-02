import { IInteractiveButton, IInteractiveList } from "../types/webhook";
import axios, { endpoints } from "../utils/axios";

const sendMessageContacts = async (
  to: string // ? usuario que recibe mensaje
  // interactive: IInteractiveList | IInteractiveButton // ? mensaje interactivo que se envía a usuario
) => {
  return await axios.post(endpoints.messages, {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: "TEMPLATE_NAME",
      language: {
        code: "LANGUAGE_AND_LOCALE_CODE",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: "http(s)://URL",
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: "TEXT_STRING",
            },
            {
              type: "currency",
              currency: {
                fallback_value: "VALUE",
                code: "USD",
                amount_1000: 100,
              },
            },
            {
              type: "date_time",
              date_time: {
                fallback_value: "MONTH DAY, YEAR",
              },
            },
          ],
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [
            {
              type: "payload",
              payload: "PAYLOAD",
            },
          ],
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [
            {
              type: "payload",
              payload: "PAYLOAD",
            },
          ],
        },
      ],
    },
  });
};

export default sendMessageContacts;
