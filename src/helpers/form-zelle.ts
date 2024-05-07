import { dbMessages } from "../db/messages";
import { FormSupportModels } from "../models";
import { IMessage } from "../types/webhook";
import axios from "../utils/axios";
import sendMessageInteractive from "./send-message-interactive";
import sendMessageText from "./send-message-text";
import { validAmount, validLocator, validReference } from "./valid-field";

const formZelle = async (message: IMessage) => {
  const { zelle } = dbMessages.form;
  const { text, from: phoneNumber, image, interactive } = message;

  const formSupport = await FormSupportModels.findOne({
    where: {
      phoneNumber,
      open: true,
    },
  });

  if (formSupport) {
    const { reference, locator, amount, uri, email } = formSupport.dataValues;

    if (!reference) {
      const notValid = await validReference(text.body);
      if (notValid) {
        return await sendMessageText(phoneNumber, notValid);
      } else {
        await formSupport.update({ reference: text.body });
        return await sendMessageText(phoneNumber, zelle.locator.message);
      }
    } else if (!locator) {
      const notValid = validLocator(text.body);
      if (notValid) {
        return await sendMessageText(phoneNumber, notValid);
      } else {
        await formSupport.update({ locator: text.body });
        return await sendMessageText(phoneNumber, zelle.amount.message);
      }
    } else if (!amount) {
      const notValid = validAmount(text.body);
      if (notValid) {
        return await sendMessageText(phoneNumber, notValid);
      } else {
        await formSupport.update({ amount: text.body });
        return await sendMessageText(phoneNumber, zelle.uri.message);
      }
    } else if (!uri) {
      if (message.type !== "image") {
        return await sendMessageText(phoneNumber, zelle.uri.message);
      } else {
        const response = await axios.get(`/${image.id}`);
        await formSupport.update({
          uri: response.data.url,
          open: false,
          send: true,
        });
        await sendMessageText(
          phoneNumber,
          `Ingresaste los siguiente datos: \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Monto*: ${amount}`
        );
        return await sendMessageInteractive(phoneNumber, {
          type: "button",
          body: {
            text: "¿Esto es correcto?",
          },
          action: {
            buttons: [
              {
                type: "reply",
                reply: {
                  id: "4",
                  title: "Si",
                },
              },
              {
                type: "reply",
                reply: {
                  id: "5",
                  title: "No",
                },
              },
            ],
          },
        });
      }
    }
  }
  return;
};

export default formZelle;
