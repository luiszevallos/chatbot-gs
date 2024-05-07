import { dbMessages } from "../db/messages";
import { FormSupportModels } from "../models";
import { IMessage } from "../types/webhook";
import axios from "../utils/axios";
import sendMessageInteractive from "./send-message-interactive";
import sendMessageText from "./send-message-text";

const formOther = async (message: IMessage) => {
  const { text, from: phoneNumber, image } = message;

  const formSupport = await FormSupportModels.findOne({
    where: {
      phoneNumber,
      open: true,
    },
  });

  if (formSupport) {
    const { other } = dbMessages.form;

    const { description, uri, email } = formSupport.dataValues;

    if (!description && message.type !== "text") {
      // ? Solicita la descripción
      return await sendMessageText(phoneNumber, other.description.message);
    } else if (!description) {
      // ? Guarda la descripción y solicita la imagen
      await formSupport.update({ description: text.body });
      return await sendMessageText(phoneNumber, other.uri.message);
    } else if (!uri && message.type !== "image") {
      // ? Solicita la imagen
      return await sendMessageText(phoneNumber, other.uri.message);
    } else if (!uri) {
      // ? Guardar la imagen
      const response = await axios.get(`/${image.id}`);
      await formSupport.update({
        uri: response.data.url,
        open: false,
        send: true,
      });
      await sendMessageText(
        phoneNumber,
        `Ingresaste los siguiente datos: \n\n*Descripción*: ${description} \n 1 - Imagen adjuntada`
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
  return;
};

export default formOther;
