import { NextFunction, Response, Request } from "express";
//
import axios, { endpoints } from "../utils/axios";

const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  const messageId = req.message?.id;

  if (messageId) {
    try {
      await axios.post(`${endpoints.messages}`, {
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
      });
    } catch (error: any) {
      console.log(JSON.stringify(error));
      const message = error?.response?.data || error.message || error;
      console.error("🚀 ~ markAsRead ~ error:", message);
    }
  }

  next();
};

export default markAsRead;
