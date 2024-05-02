import { dbMessages } from "../db/messages";
import { IMessage } from "../types/webhook";
import sendMessageContacts from "./send-message-contacts";
import sendMessageInteractive from "./send-message-interactive";
import sendMessageText from "./send-message-text";

const resMessageInteractive = async ({ from, interactive }: IMessage) => {
  try {
    console.log("🚀 ~ resMessageInteractive ~ interactive:", interactive);
    const replyId =
      interactive?.list_reply?.id || interactive?.button_reply?.id;
    // !
    console.log("🚀 ~ resMessageInteractive ~ replyId:", replyId);
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

      case "112":
        await sendMessageText(from, dbMessages.response["112"].message);
        await sendMessageInteractive(from, dbMessages.continueConversation);
        break;

      // ? Response 2 --> 22 --> 222

      case "2":
        await sendMessageInteractive(from, dbMessages.response["2"]);
        break;

      case "21":
        await sendMessageText(from, dbMessages.response["21"].message);
        await sendMessageInteractive(from, dbMessages.continueConversation);
        break;

      case "22":
        await sendMessageText(from, dbMessages.response["22"].message);
        await sendMessageInteractive(from, dbMessages.continueConversation);
        break;

      case "23":
        await sendMessageText(from, dbMessages.response["23"].message);
        await sendMessageInteractive(from, dbMessages.continueConversation);
        break;

      case "24":
        await sendMessageText(from, dbMessages.response["24"].message);
        await sendMessageInteractive(from, dbMessages.continueConversation);
        break;

      // ? Response 3 --> 33 --> 333

      case "3":
        console.log("3");
        await sendMessageContacts(from);
        break;

      case "4":
        await sendMessageInteractive(from, dbMessages.continueConversation);
        break;

      case "41":
        await sendMessageInteractive(from, dbMessages.welcome);
        break;

      case "42":
        await sendMessageText(from, dbMessages.goodBye.message);
        break;

      default:
        await sendMessageInteractive(from, dbMessages.welcome);
        break;
    }
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};

export default resMessageInteractive;
