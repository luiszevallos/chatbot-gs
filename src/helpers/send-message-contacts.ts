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
        addresses: [
          {
            street: "STREET",
            city: "CITY",
            state: "STATE",
            zip: "ZIP",
            country: "COUNTRY",
            country_code: "COUNTRY_CODE",
            type: "HOME",
          },
          {
            street: "STREET",
            city: "CITY",
            state: "STATE",
            zip: "ZIP",
            country: "COUNTRY",
            country_code: "COUNTRY_CODE",
            type: "WORK",
          },
        ],
        birthday: "YEAR_MONTH_DAY",
        emails: [
          {
            email: "EMAIL",
            type: "WORK",
          },
          {
            email: "EMAIL",
            type: "HOME",
          },
        ],
        name: {
          formatted_name: "NAME",
          first_name: "FIRST_NAME",
          last_name: "LAST_NAME",
          middle_name: "MIDDLE_NAME",
          suffix: "SUFFIX",
          prefix: "PREFIX",
        },
        org: {
          company: "COMPANY",
          department: "DEPARTMENT",
          title: "TITLE",
        },
        phones: [
          {
            phone: "PHONE_NUMBER",
            type: "HOME",
          },
          {
            phone: "PHONE_NUMBER",
            type: "WORK",
            wa_id: "PHONE_OR_WA_ID",
          },
        ],
        urls: [
          {
            url: "URL",
            type: "WORK",
          },
          {
            url: "URL",
            type: "HOME",
          },
        ],
      },
    ],
  });
};

export default sendMessageContacts;
