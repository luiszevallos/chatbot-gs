import { NextFunction, Response, Request } from "express";
import axios, { endpoints } from "../utils/axios";
import { IMessage } from "../types/webhook";

const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  const { object, entry } = req.body;

  if (object && entry) {
    const messages = entry[0]?.changes[0]?.value?.messages || [];
    await Promise.all(
      messages.map(async (message: IMessage) => {
        await axios.put(`${endpoints.messages}/${message.id}`);
      })
    );
  }

  next();
};

export default markAsRead;
