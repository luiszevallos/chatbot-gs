import { Request, Response } from "express";
//
import axios, { endpoints } from "../utils/axios";
import { VERIFY_TOKEN } from "../../config-global";
import { IChange } from "../types/webhook";

export const getWebhook = async (req: Request, res: Response) => {
  let mode = req.query["hub.mode"];

  let challenge = req.query["hub.challenge"];

  let token = req.query["hub.verify_token"];

  if (token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.status(403).json({
      message: "Error en conectar bot",
    });
  }
};

export const postWebhook = async (req: Request, res: Response) => {
  const { object, entry } = req.body;

  if (object && entry?.length > 0) {
    const change: IChange = entry[0].changes[0];

    if (change) {
      const message = change.value.messages[0];

      if (message) {
        await axios.post(endpoints.messages, {
          to: message.from,
          type: "text",
          messaging_product: "whatsapp",
          text: {
            body: "Hello desde webhook",
          },
        });
        return res.sendStatus(200);
      }
    }
  }
  res.sendStatus(404);
};
