import { dbMessages } from "../db/messages";
import { FormSupportModels } from "../models";
import { IMessage } from "../types/webhook";
import axios from "../utils/axios";
import sendMessageInteractive from "./send-message-interactive";
import sendMessageText from "./send-message-text";
import {
  validAmount,
  validLocator,
  validNumberPhone,
  validReference,
} from "./valid-field";

const formPaymentMobile = async (message: IMessage) => {
  const { paymentMobile } = dbMessages.form;
  const { text, from: phoneNumber, image, interactive, type } = message;

  const formSupport = await FormSupportModels.findOne({
    where: {
      phoneNumber,
      open: true,
    },
  });

  if (formSupport) {
    const { reference, locator, issuerNumber, amount, uri, email, bank } =
      formSupport.dataValues;

    if (!reference) {
      const notValid = await validReference(text.body);
      if (notValid) {
        return await sendMessageText(phoneNumber, notValid);
      } else {
        await formSupport.update({ reference: text.body });
        return await sendMessageText(
          phoneNumber,
          paymentMobile.locator.message
        );
      }
    } else if (!locator) {
      const notValid = validLocator(text.body);
      if (notValid) {
        return await sendMessageText(phoneNumber, notValid);
      } else {
        await formSupport.update({ locator: text.body });
        return await sendMessageText(
          phoneNumber,
          paymentMobile.issuerNumber.message
        );
      }
    } else if (!issuerNumber) {
      const notValid = validNumberPhone(text.body);
      if (notValid) {
        return await sendMessageText(phoneNumber, notValid);
      } else {
        await formSupport.update({ issuerNumber: text.body });
        return await sendMessageText(phoneNumber, paymentMobile.amount.message);
      }
    } else if (!amount) {
      const notValid = validAmount(text.body);
      if (notValid) {
        return await sendMessageText(phoneNumber, notValid);
      } else {
        await formSupport.update({ amount: text.body });
        return await sendMessageText(phoneNumber, paymentMobile.uri.message);
      }
    } else if (!uri) {
      if (message.type !== "image") {
        return await sendMessageText(phoneNumber, paymentMobile.uri.message);
      } else {
        const response = await axios.get(`/${image.id}`);
        await formSupport.update({
          uri: response.data.url,
          open: false,
          send: true,
        });
        return await sendMessageInteractive(phoneNumber, {
          type: "button",
          body: {
            text: `Ingresaste los siguiente datos: \n\n*Banco*: ${bank} \n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Número emisor*: ${issuerNumber} \n*Monto*: ${amount}`,
          },
          footer: {
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

export default formPaymentMobile;
