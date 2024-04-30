import { Request, Response } from "express";
import { QSData } from "../helpers";
import { messages } from "../db/messages";

export const getChatbot = async (req: Request, res: Response) => {
  const { payload } = req.body;
  console.log("🚀 ~ getChatbot ~ payload:", payload);

  // const { type, text, source } = payload;

  // switch (type) {
  //   case "list_reply":
  //     break;

  //   case "button_reply":
  //     break;

  //   case "text":
  //     if (text) {
  //       const data = QSData(source, `${messages.welcome}`);
  //       console.log(data);
  //       return res.status(200).json({
  //         message: messages.welcome,
  //       });
  //     }

  //   default:
  //     break;
  // }

  res.status(200).json({
    message: "Conectado a bot",
  });
};
