import { NextFunction, Request, Response } from "express";
import FormSupport from "../helpers/form-support";

const formSupport = new FormSupport();

const openSupportForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req;

  if (message) {
    const existFormSupport = await formSupport.consultSupportForm(message);

    if (existFormSupport) {
      return res.sendStatus(200);
    }
  }

  next();
};

export default openSupportForm;
