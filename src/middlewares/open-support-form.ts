import { NextFunction, Request, Response } from "express";
import { FormSupportModels } from "../models";
import { formOther, formPaymentMobile, formZelle } from "../helpers";

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

    // ? Valida si existe un form de soporte abierto
    if (formSupport) {
      const { type } = formSupport.dataValues;

      switch (type) {
        case "paymentMobile":
          await formPaymentMobile(message);
          return res.sendStatus(200);

        case "zelle":
          await formZelle(message);
          return res.sendStatus(200);

        case "other":
          await formOther(message);
          return res.sendStatus(200);

        default:
          // ? se cierra form de soporte
          formSupport.update({
            open: false,
            send: false,
            canceled: true,
          });
          break;
      }
    }
  }

  next();
};

export default openSupportForm;
