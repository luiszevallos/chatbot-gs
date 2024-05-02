import { dbMessages } from "../db/messages";
import { IMessage } from "../types/webhook";
import sendMessageContacts from "./send-message-contacts";
import sendMessageInteractive from "./send-message-interactive";
import sendMessageText from "./send-message-text";

const resMessageInteractive = async ({ from, interactive }: IMessage) => {
  console.log("🚀 ~ resMessageInteractive ~ interactive:", interactive);
  const replyId = interactive?.list_reply?.id || interactive?.button_reply?.id;
  // !
  console.log("🚀 ~ resMessageInteractive ~ replyId:", replyId);
  switch (replyId) {
    // ? Response 1 --> 11 --> 111
    case "1":
      return await sendMessageInteractive(from, dbMessages.response["1"]);

    case "11":
      return await sendMessageInteractive(from, dbMessages.response["11"]);

    case "12":
      await sendMessageText(from, dbMessages.response["12"].message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "111":
      await sendMessageText(from, dbMessages.response["111"].message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "112":
      await sendMessageText(from, dbMessages.response["112"].message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    // ? Response 2 --> 22 --> 222

    case "2":
      return await sendMessageInteractive(from, dbMessages.response["2"]);

    case "21":
      await sendMessageText(from, dbMessages.response["21"].message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "22":
      await sendMessageText(from, dbMessages.response["22"].message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "23":
      await sendMessageText(from, dbMessages.response["23"].message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "24":
      await sendMessageText(from, dbMessages.response["24"].message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    // ? Response 3 --> 33 --> 333

    case "3":
      console.log("3");
      return await sendMessageContacts(from);

    case "4":
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "41":
      return await sendMessageInteractive(from, dbMessages.welcome);

    case "42":
      return await sendMessageText(from, dbMessages.goodBye.message);

    default:
      return await sendMessageInteractive(from, dbMessages.welcome);
  }
};

export default resMessageInteractive;
