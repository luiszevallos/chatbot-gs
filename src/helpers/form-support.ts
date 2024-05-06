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

class FormSupport {
  async dbForm(phoneNumber: string) {
    const formSupport = await FormSupportModels.findOne({
      where: {
        phoneNumber,
        open: true,
      },
    });
    return formSupport;
  }

  async formOther(message: IMessage) {
    const { other } = dbMessages.form;
    const { text, from: phoneNumber, image } = message;
    const formSupport = await this.dbForm(phoneNumber);

    if (formSupport) {
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
  }

  async sendFormSupport(data: any) {
    console.log("🚀 ~ FormSupport ~ sendFormSupport ~ data:", data);
  }

  async formPaymentMobile(message: IMessage) {
    const { paymentMobile } = dbMessages.form;
    const { text, from: phoneNumber, image, interactive, type } = message;
    const formSupport = await this.dbForm(phoneNumber);

    if (formSupport) {
      const { reference, locator, issuerNumber, amount, uri, email } =
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
          await formSupport.update({ phoneNumber: text.body });
          return await sendMessageText(
            phoneNumber,
            paymentMobile.amount.message
          );
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
        if (type === "image") {
          return await sendMessageText(
            phoneNumber,
            "Debe de enviar una imagen de la referencia"
          );
        } else {
          const response = await axios.get(`/${image.id}`);
          await formSupport.update({ uri: response.data.url });
          return await sendMessageInteractive(phoneNumber, {
            type: "button",
            body: {
              text: `Ingresaste los siguiente datos: \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Número emisor*: ${issuerNumber} \n*Monto*: ${amount}`,
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
      } else if (type === "button") {
        const replyId =
          interactive?.list_reply?.id || interactive?.button_reply?.id;

        if (replyId === "form_1") {
          await this.sendFormSupport({
            phoneNumber,
            email,
            concept: "Pago no validado",
            uri,
            text: `Datos ingresado \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Número emisor*: ${issuerNumber} \n*Monto*: ${amount}`,
          });
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
            dbMessages.form.paymentMobile.reference.message
          );
        }
      } else {
        return await sendMessageInteractive(phoneNumber, {
          type: "button",
          body: {
            text: `Ingresaste los siguiente datos: \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Número emisor*: ${issuerNumber} \n*Monto*: ${amount}`,
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
  }

  async consultSupportForm(message: IMessage) {
    const { from: phoneNumber } = message;

    const formSupport = await this.dbForm(phoneNumber);

    if (formSupport) {
      const { type } = formSupport.dataValues;

      switch (type) {
        case "other":
          await this.formOther(message);
          break;

        case "paymentMobile":
          await this.formPaymentMobile(message);
          break;

        default:
          break;
      }
      return true;
    } else {
      return false;
    }
  }
}

export default FormSupport;
