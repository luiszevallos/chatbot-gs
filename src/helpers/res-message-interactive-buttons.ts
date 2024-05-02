import { dbMessages } from "../db/messages";
import { IMessage } from "../types/webhook";
import sendMessageInteractiveList from "./send-message-interactive";

const resMessageInteractiveButtons = async ({
  from,
  interactive,
}: IMessage) => {
  try {
    switch (interactive?.button_reply?.id) {
      // ? Pregunta frecuente
      case "1":
      // const { sections } = dbMessages.frequent_questions;
      // return await sendMessageInteractiveList(
      //   from,
      //   "Preguntas frecuente",
      //   sections
      // );

      default:
        return;
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default resMessageInteractiveButtons;
