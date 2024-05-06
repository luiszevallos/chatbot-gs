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
      // const resDownload = await axios.get(response.data.url)
      // console.log(JSON.stringify(resDownload.data));
      await formSupport.update({ uri: response.data.url, open: false });
      const data = {
        imagen: response.data.url,
        description,
        phoneNumber,
        email,
      };
      // TODO: aquí se envía en form a soporte
      await sendMessageText(phoneNumber, dbMessages.support.message);
      return await sendMessageInteractive(phoneNumber, dbMessages.continue);
    }
  }
  return;
};

export default formOther;
