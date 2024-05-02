import { dbMessages } from "../db/messages";
import { IMessage } from "../types/webhook";
import sendMessageContacts from "./send-message-contacts";
import sendMessageInteractive from "./send-message-interactive";
import sendMessageText from "./send-message-text";

const responseMessageInteractive = async ({ from, interactive }: IMessage) => {
  const replyId = interactive?.list_reply?.id || interactive?.button_reply?.id;

  switch (replyId) {
    // ? Response 1 --> 11 --> 111
    case "1":
      return await sendMessageInteractive(from, dbMessages.response.res1);

    case "11":
      return await sendMessageInteractive(from, dbMessages.response.res11);

    case "12":
      await sendMessageText(from, dbMessages.response.res12.message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "111":
      await sendMessageText(from, dbMessages.response.res111.message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "112":
      await sendMessageText(from, dbMessages.response.res112.message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    // ? Response 2 --> 22 --> 222

    case "2":
      return await sendMessageInteractive(from, dbMessages.response.res2);

    case "21":
      await sendMessageText(from, dbMessages.response.res21.message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "22":
      await sendMessageText(from, dbMessages.response.res22.message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "23":
      await sendMessageText(from, dbMessages.response.res23.message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    case "24":
      await sendMessageText(from, dbMessages.response.res24.message);
      return await sendMessageInteractive(
        from,
        dbMessages.continueConversation
      );

    // ? Response 3 --> 33 --> 333

    case "3":
      return await sendMessageInteractive(from, dbMessages.response.res3);

    case "42":
      return await sendMessageText(from, dbMessages.response.res33.message);

    // ? Response 4 --> 44 --> 444

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

export default responseMessageInteractive;
