import { Request, Response } from "express";
//
import { VERIFY_TOKEN } from "../../config-global";
import { IChange } from "../types/webhook";
import {
  sendMessageInteractiveButton,
  sendMessageInteractiveList,
} from "../helpers/send-message";
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
  try {
    if (object && entry?.length > 0) {
      const change: IChange = entry[0].changes[0];

      if (change) {
        if (change?.value?.messages?.length > 0) {
          const messageReceived = change.value.messages[0];

          const { from, type, interactive } = messageReceived;

          switch (type) {
            case "text":
              const { message, buttons } = dbMessages.welcome;
              await sendMessageInteractiveButton(from, message, buttons);
              break;

            case "interactive":
              console.log("🚀 ~ postWebhook ~ interactive:", interactive);
              if (interactive?.type === "button_reply") {
                // switch (interactive.button_reply.id) {
                //   case "1":
                //     const { sections, header } = dbMessages.frequent_questions;
                //     await sendMessageInteractiveList(
                //       from,
                //       header.message,
                //       sections
                //     );
                //     res.sendStatus(200);
                //     break;
                //   default:
                //     break;
                // }
              }
              break;

            default:
              break;
          }
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(404);
      }
    }
  } catch (error) {
    console.log("🚀 ~ postWebhook ~ error:", error);
    res.sendStatus(500);
  }
};
