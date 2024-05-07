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
        await formSupport.update({ uri: response.data.url });
        return await sendMessageInteractive(phoneNumber, {
          type: "button",
          body: {
            text: `Ingresaste los siguiente datos: \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Monto*: ${amount}`,
          },
          action: {
            buttons: [
              {
                type: "reply",
                reply: {
                  id: "form_1",
                  title: "Si",
                },
              },
              {
                type: "reply",
                reply: {
                  id: "form_2",
                  title: "No",
                },
              },
            ],
          },
        });
      }
    } else if (
      message.type === "interactive" &&
      message.interactive?.type === "button_reply"
    ) {
      const replyId =
        interactive?.list_reply?.id || interactive?.button_reply?.id;

      if (replyId === "form_1") {
        const data = {
          phoneNumber,
          email,
          concept: "Pago no validado",
          uri,
          text: `Datos ingresado \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Monto*: ${amount}`,
        };
        console.log("🚀 ~ formZelle ~ data:", data);
        await formSupport.update({ open: false });
        await sendMessageText(phoneNumber, dbMessages.support.message);
        return await sendMessageInteractive(phoneNumber, dbMessages.continue);
      } else {
        await formSupport.update({
          reference: "",
          locator: "",
          issuerNumber: "",
          amount: "",
          uri: "",
        });
        return await sendMessageText(
          phoneNumber,
          dbMessages.form.zelle.reference.message
        );
      }
    } else {
      return await sendMessageInteractive(phoneNumber, {
        type: "button",
        body: {
          text: `Ingresaste los siguiente datos: \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Monto*: ${amount}`,
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: "form_1",
                title: "Si",
              },
            },
            {
              type: "reply",
              reply: {
                id: "form_2",
                title: "No",
              },
            },
          ],
        },
      });
    }
  }
  return;
};

export default formZelle;
