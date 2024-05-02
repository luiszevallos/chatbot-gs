import { dbMessages } from "../db/messages";
import { IMessage } from "../types/webhook";
import sendMessageInteractive from "./send-message-interactive";
import sendMessageText from "./send-message-text";

const resMessageInteractive = async ({ from, interactive }: IMessage) => {
  try {
    const replyId =
      interactive?.list_reply?.id || interactive?.button_reply?.id;
    switch (replyId) {
      // ? Response 1 --> 11 --> 111
      case "1":
        await sendMessageInteractive(from, dbMessages.response["1"]);
        break;

      case "11":
        await sendMessageInteractive(from, dbMessages.response["11"]);
        break;

      case "12":
        await sendMessageText(from, dbMessages.response["12"].message);
        await sendMessageInteractive(from, dbMessages.continueConversation);
        break;

      case "111":
        await sendMessageText(from, dbMessages.response["111"].message);
        await sendMessageInteractive(from, dbMessages.continueConversation);
        break;

      // ? Response 2 --> 22 --> 222

      case "2":
        await sendMessageInteractive(from, dbMessages.response["2"]);
        break;

      case "3":
        await sendMessageInteractive(from, dbMessages.response["3"]);
        break;

      case "4":
        await sendMessageInteractive(from, dbMessages.continueConversation);
        break;

      default:
        await sendMessageInteractive(from, dbMessages.welcome);
        break;
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default resMessageInteractive;
