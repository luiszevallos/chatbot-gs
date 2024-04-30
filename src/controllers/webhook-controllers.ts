import { Request, Response } from "express";
//
import { VERIFY_TOKEN } from "../../config-global";
import { IChange } from "../types/webhook";
import { sendMessageInteractiveButton } from "../helpers/send-message";
import { dbMessages } from "../db/messages";

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
      if (change?.value?.messages?.length > 0) {
        const messageReceived = change.value.messages[0];
        console.log("🚀 ~ postWebhook ~ messageReceived:", messageReceived);

        const { from, type } = messageReceived;

        if (type === "text") {
          // ? Mensaje de bienvenida
          const { message, buttons } = dbMessages.welcome;

          await sendMessageInteractiveButton(from, message, buttons);

          return res.sendStatus(200);
        }
      } else {
        return res.sendStatus(404);
      }
    }
  }
};
