import { NextFunction, Request, Response } from "express";
import { FormSupportModels } from "../models";
import { sendMessageInteractive, sendMessageText } from "../helpers";
import { dbMessages } from "../db/messages";

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

    const { text, from } = message;

    if (formSupport && message.type === "text") {
      const { locator, reference, amount } = formSupport.dataValues;

      if (!locator) {
        await formSupport.update({ locator: text.body });
        await sendMessageText(from, dbMessages.form.reference.message);
      } else if (!reference) {
        await formSupport.update({ reference: text.body });
        await sendMessageText(from, dbMessages.form.amount.message);
      } else if (!amount) {
        await formSupport.update({ amount: text.body });
        await sendMessageInteractive(from, {
          type: "button",
          body: {
            text: `Ingresaste los siguiente datos \n\n*Localizador*: ${locator} \n*Referencia*: ${reference} \n*Monto*: ${text.body} \n¿Esto es correcto?`,
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

      return res.sendStatus(200);
    }
  }

  next();
};

export default openSupportForm;
