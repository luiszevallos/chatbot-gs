import { NextFunction, Request, Response } from "express";
import { FormSupportModels } from "../models";
import { formOther, formPaymentMobile } from "../helpers";

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
      const { type } = formSupport.dataValues;
      switch (type) {
        case "paymentMobile":
          formPaymentMobile(message);
          break;

        case "other":
          formOther(message);

        default:
          break;
      }

      return res.sendStatus(200);
    }
  }

  next();
};

export default openSupportForm;
