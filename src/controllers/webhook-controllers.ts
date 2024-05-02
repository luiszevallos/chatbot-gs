import { Request, Response } from "express";
//
import { VERIFY_TOKEN } from "../../config-global";
import { dbMessages } from "../db/messages";
import { IChange } from "../types/webhook";
import { sendMessageInteractive, sendMessageText } from "../helpers";

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
          console.log("🚀 ~ postWebhook ~ from:", from);

          if (type === "interactive") {
            // TODO: aquí va el switch para responde dependiendo la interacción
            if (interactive?.type === "list_reply") {
              switch (interactive?.list_reply?.id) {
                case "2":
                  await sendMessageInteractive(from, dbMessages.response["2"]);
                  break;

                case "3":
                  await sendMessageInteractive(from, dbMessages.response["3"]);
                  break;

                case "4":
                  await sendMessageInteractive(from, dbMessages.response["4"]);
                  break;

                case "42":
                  await sendMessageText(
                    from,
                    dbMessages.response["42"]?.message
                  );
                  break;

                default:
                  await sendMessageInteractive(from, dbMessages.welcome);
                  break;
              }
            }
          } else {
            // * envía el mensaje de bienvenida primer contacto
            await sendMessageInteractive(from, dbMessages.welcome);
          }
        } catch (error: any) {
          const message = error?.response?.data || error.message || error;
          console.log("🚀 ~ postWebhook ~ error:", message);
        }

        return res.sendStatus(200);
      }
    }
    return res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
};
