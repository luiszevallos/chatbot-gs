import { Request, Response } from "express";
import axios, { endpoints } from "../utils/axios";
import { VERIFY_TOKEN } from "../../config-global";

export const getWebhook = async (req: Request, res: Response) => {
  let mode = req.query["hub.mode"];
  console.log("🚀 ~ getWebhook ~ mode:", mode);
  let challenge = req.query["hub.challenge"];
  console.log("🚀 ~ getWebhook ~ challenge:", challenge);
  let token = req.query["hub.verify_token"];
  console.log("🚀 ~ getWebhook ~ token:", token);

  if (token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.status(403).json({
      message: "Error en conectar bot",
    });
  }
  // try {
  //   const response = await axios.post(endpoints.messages, {
  //     messaging_product: "whatsapp",
  //     to: "584242755461",
  //     type: "template",
  //     template: {
  //       name: "hello_world",
  //       language: {
  //         code: "en_US",
  //       },
  //     },
  //   });
  //   console.log("🚀 ~ getWebhook ~ response:", response);
  // } catch (error) {
  //   console.log("🚀 ~ getWebhook ~ error:", error);
  // }
};

export const postWebhook = async (req: Request, res: Response) => {
  const { body } = req;
  console.log("🚀 ~ postWebhook ~ body:", JSON.stringify(body, null, 2));

  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0]?.value?.message &&
      body.entry[0].changes[0].value?.message[0]
    ) {
      const phoneNumberId =
        body.entry[0].challenge[0].value.metadata.phone_number_id;
      console.log("🚀 ~ postWebhook ~ phoneNumberId:", phoneNumberId);
      const from = body.entry[0].changes[0].value.messages[0].from;
      const msgBody = body.entry[0].changes[0].value.messages[0].text.body;
      console.log("🚀 ~ postWebhook ~ msgBody:", msgBody);

      await axios.post(endpoints.messages, {
        messaging_product: "whatsapp",
        to: from,
        text: {
          body: "HI.. Im P",
        },
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
};
