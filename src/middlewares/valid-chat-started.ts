import { NextFunction, Response, Request } from "express";
//\
import { ChatModels } from "../models";
import { sendMessageText, validateCreationDate } from "../helpers";
import { dbMessages } from "../db/messages";
import { validEmail } from "../helpers";

const ValidChatStarted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req;

  try {
    if (message) {
      const phoneNumber = message.from;
      const chat = await ChatModels.findOne({
        where: {
          phoneNumber,
          open: true,
        },
      });

      if (!chat) {
        // ? Valida si el texto enviado es un correo validado

        if (validEmail(message.text.body)) {
          // TODO: aquí va la petición para validar existencia de correo

          const email = message.text.body;
          await ChatModels.create({
            phoneNumber,
            email,
          });
          next();
        } else {
          // ? envía mensaje de bienvenida solicitando el correo
          await sendMessageText(message.from, dbMessages.greeting.message);
          return res.sendStatus(200);
        }
      } else if (validateCreationDate(chat.dataValues.createdAt)) {
        next();
      } else {
        await chat.update({
          open: false,
        });
        await sendMessageText(message.from, dbMessages.greeting.message);
        return res.sendStatus(200);
      }
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export default ValidChatStarted;
