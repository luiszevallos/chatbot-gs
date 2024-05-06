import { NextFunction, Response, Request } from "express";
//
import { IChange } from "../types/webhook";

const validMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { object, entry } = req.body;

  try {
    if (object && entry?.length > 0 && entry[0].changes?.length > 0) {
      const change: IChange = entry[0].changes[0];

      if (change && change?.value?.messages?.length > 0) {
        const message = change.value.messages[0];
        if (message) {
          req.message = message;
          next();
        } else {
          return res.sendStatus(404);
        }
      }
    } else return res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
};

export default validMessage;
