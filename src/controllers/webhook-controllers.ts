import { Request, Response } from "express";
//
import { VERIFY_TOKEN } from "../../config-global";
import { dbMessages } from "../db/messages";
import { resMessageInteractive, sendMessageInteractive } from "../helpers";

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

  if (!message) {
    return res.sendStatus(404);
  }

  try {
    const {
      from,
      type,
      text: { body },
    } = message;
    console.log(`Usuario: ${from} a respondido: ${body}`);

    if (type === "interactive") {
      // * responde los mensajes interactivo
      const res = await resMessageInteractive(message);
      console.log("🚀 ~ postWebhook ~ res:", res);
    } else {
      // * envía el mensaje de bienvenida primer contacto
      await sendMessageInteractive(from, dbMessages.welcome);
    }
  } catch (error: any) {
    console.log(JSON.stringify(error));
    const message = error?.response?.data || error.message || error;
    console.error("🚀 ~ postWebhook ~ error:", message);
  }

  return res.sendStatus(200);
};
