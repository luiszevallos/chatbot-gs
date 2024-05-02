import { NextFunction, Response, Request } from "express";
//
import axios, { endpoints } from "../utils/axios";
import { IMessage } from "../types/webhook";

const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  const { object, entry } = req.body;

  if (object && entry) {
    try {
      const messages = entry[0]?.changes[0]?.value?.messages || [];
      const message = messages?.length > 0 ? messages[0] : null;
      if (message) {
        await axios.post(`${endpoints.messages}`, {
          messaging_product: "whatsapp",
          status: "read",
          message_id: message.id,
        });
      }
    } catch (error) {
      console.log("🚀 ~ markAsRead ~ error:", error);
    }
  }

  next();
};

export default markAsRead;
