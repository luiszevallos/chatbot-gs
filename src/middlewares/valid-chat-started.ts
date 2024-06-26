import { NextFunction, Response, Request } from "express";
//\
import { ChatModels } from "../models";
import { sendMessageText, validateCreationDate } from "../helpers";
import { dbMessages } from "../db/messages";
import { validEmail } from "../helpers";

// ? Valida si el numero de teléfono tiene un conversación iniciada
// ? Si no envía mensaje solicitado el correo
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
        // ? Valida si el mensaje tiene es un correo
        // ? para iniciar conversación
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
        // ? Valida la inicializan de la conversación si no sobrepasa en tiempo respuesta 2H
        next();
      } else {
        // ? Se cierra conversación anterior y se envía mensaje de bienvenida
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
