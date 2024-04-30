import { Request, Response } from "express";
import axios, { endpoints } from "../utils/axios";

export const getWebhook = async (req: Request, res: Response) => {
  const { body } = req;
  console.log("🚀 ~ getWebhook ~ body:", body);

  try {
    const response = await axios.post(endpoints.messages, {
      messaging_product: "whatsapp",
      to: "584242755461",
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US",
        },
      },
    });
    console.log("🚀 ~ getWebhook ~ response:", response);
  } catch (error) {
    console.log("🚀 ~ getWebhook ~ error:", error);
  }

  res.status(200).json({
    message: "Conectado a bot",
  });
};
