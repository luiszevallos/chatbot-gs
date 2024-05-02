import { Request, Response } from "express";
//
import { VERIFY_TOKEN } from "../../config-global";
import { dbMessages } from "../db/messages";
import { responseMessageInteractive, sendMessageInteractive } from "../helpers";

export const getWebhook = async (req: Request, res: Response) => {
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];
  // let mode = req.query["hub.mode"];

  if (token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.status(403).json({
      message: "Error en conectar bot",
    });
  }
};

export const postWebhook = async (req: Request, res: Response) => {
  const { message } = req;
  console.log("🚀 ~ postWebhook ~ message:", message);

  if (!message) {
    return res.sendStatus(404);
  }

  try {
    const { from, type } = message;

    if (type === "interactive") {
      await responseMessageInteractive(message);
    } else {
      await sendMessageInteractive(from, dbMessages.welcome);
    }
  } catch (error: any) {
    console.log(JSON.stringify(error));
    const message = error?.response?.data || error.message || error;
    console.error("🚀 ~ postWebhook ~ error:", message);
  }

  return res.sendStatus(200);
};
