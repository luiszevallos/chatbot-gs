import { NextFunction, Request, Response } from "express";
import { FormSupportModels } from "../models";
import { sendMessageInteractive, sendMessageText } from "../helpers";
import { dbMessages } from "../db/messages";
import axios from "../utils/axios";

const openSupportForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req;

  if (message) {
    const formSupport = await FormSupportModels.findOne({
      where: {
        phoneNumber: message.from,
        open: true,
      },
    });

    const { text, from: phoneNumber, image } = message;

    if (formSupport) {
      const { type, email, description, uri, locator, reference, amount } =
        formSupport.dataValues;

      const formSupportOther = async () => {
        if (!description && message.type !== "text") {
          return await sendMessageText(phoneNumber, dbMessages.other.message);
        } else if (!description) {
          await formSupport.update({ description: text.body });
          return await sendMessageText(
            phoneNumber,
            dbMessages.attachImage.message
          );
        } else if (!uri && message.type !== "image") {
          return await sendMessageText(
            phoneNumber,
            dbMessages.attachImage.message
          );
        } else if (!uri) {
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
      };

      switch (type) {
        case "other":
          return await formSupportOther();

        default:
          break;
      }

      // if (!locator) {
      //   await formSupport.update({ locator: text.body });
      //   await sendMessageText(from, dbMessages.form.reference.message);
      // } else if (!reference) {
      //   await formSupport.update({ reference: text.body });
      //   await sendMessageText(from, dbMessages.form.amount.message);
      // } else if (!amount) {
      //   await formSupport.update({ amount: text.body });
      //   await sendMessageInteractive(from, {
      //     type: "button",
      //     body: {
      //       text: `Ingresaste los siguiente datos \n\n*Localizador*: ${locator} \n*Referencia*: ${reference} \n*Monto*: ${text.body} \n¿Esto es correcto?`,
      //     },
      //     action: {
      //       buttons: [
      //         {
      //           type: "reply",
      //           reply: {
      //             id: "form_1",
      //             title: "Si",
      //           },
      //         },
      //         {
      //           type: "reply",
      //           reply: {
      //             id: "form_2",
      //             title: "No",
      //           },
      //         },
      //       ],
      //     },
      //   });
      // }

      return res.sendStatus(200);
    }
  }

  next();
};

export default openSupportForm;
