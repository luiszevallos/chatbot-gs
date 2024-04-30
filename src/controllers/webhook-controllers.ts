import { Request, Response } from "express";
// import axios, { endpoints } from "../utils/axios";
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
