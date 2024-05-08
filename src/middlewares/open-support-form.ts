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

    if (formSupport) {
      console.log(
        `El numero ${message.from} tiene un form de soporte abierto, tipo ${formSupport.dataValues.type}`
      );
      const { type } = formSupport.dataValues;
      switch (type) {
        case "paymentMobile":
          await formPaymentMobile(message);
          break;

        case "zelle":
          await formZelle(message);
          break;

        case "other":
          await formOther(message);
          break;

        default:
          break;
      }

      return res.sendStatus(200);
    }
  }

  next();
};

export default openSupportForm;
