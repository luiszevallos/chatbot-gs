import { dbMessages } from "../db/messages";
import { IMessage } from "../types/webhook";
import sendMessageInteractive from "./send-message-interactive";
import sendMessageText from "./send-message-text";

const resMessageInteractiveButton = async ({ from, interactive }: IMessage) => {
  try {
    switch (interactive?.list_reply?.id) {
      case "42":
        await sendMessageText(from, dbMessages.response["42"]?.message);
        break;

      default:
        await sendMessageInteractive(from, dbMessages.welcome);
        break;
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default resMessageInteractiveButton;
