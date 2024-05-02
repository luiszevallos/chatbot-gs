import { Request, Response } from "express";
//
import { VERIFY_TOKEN } from "../../config-global";
import { dbMessages } from "../db/messages";
import { IChange } from "../types/webhook";
import { sendMessageInteractive } from "../helpers";

export const getWebhook = async (req: Request, res: Response) => {
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];
  let mode = req.query["hub.mode"];

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
  try {
    if (object && entry?.length > 0) {
      const change: IChange = entry[0].changes[0];

      if (change && change?.value?.messages?.length > 0) {
        const messageReceived = change.value.messages[0];

        try {
          const { from, type, interactive } = messageReceived;
          console.log("🚀 ~ postWebhook ~ messageReceived:", messageReceived);

          // if (type === "interactive") {
          //   console.log("🚀 ~ postWebhook ~ type:", type);
          // } else {
          const { welcome } = dbMessages.list;
          const res = await sendMessageInteractive(from, welcome);
          console.log("🚀 ~ postWebhook ~ res:", res);
          // }
        } catch (error) {
          console.log("🚀 ~ postWebhook ~ error:", error);
        }

        return res.sendStatus(200);
      }
    }
    return res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
};
