// import { dbMessages } from "../db/messages";
import { dbMessages } from "../db/messages";
import { ChatModels, FormSupportModels } from "../models";
import { IMessage } from "../types/webhook";
import sendMessageInteractive from "./send-message-interactive";
import sendMessageText from "./send-message-text";
// import sendMessageInteractive from "./send-message-interactive";
// import sendMessageText from "./send-message-text";

const responseMessageInteractive = async (message: IMessage) => {
  const { from: phoneNumber, interactive } = message;
  const replyId = interactive?.list_reply?.id || interactive?.button_reply?.id;

  const sendFormSupport = async () => {
    const chat = await ChatModels.findOne({
      where: {
        phoneNumber,
        open: true,
      },
    });
    if (chat) {
      const email = chat.dataValues.email;
      const data = {
        phoneNumber,
        email,
        description: `Usuario no puede ingresar a la plataforma con el correo: ${email}`,
      };
      // TODO: Aquí se envía el formulario a soporte
      await sendMessageText(phoneNumber, dbMessages.support.message);
      return await sendMessageInteractive(phoneNumber, dbMessages.continue);
    }
  };

  const closeConversation = async () => {
    const chat = await ChatModels.findOne({
      where: {
        phoneNumber,
        open: true,
      },
    });
    if (chat) {
      await chat.update({
        open: false,
      });
    }
    return await sendMessageText(phoneNumber, dbMessages.bye.message);
  };

  const createFormAnother = async () => {
    const { description } = dbMessages.form.other;
    const chat = await ChatModels.findOne({
      where: {
        phoneNumber,
        open: true,
      },
    });
    if (chat) {
      await FormSupportModels.create({
        type: "other",
        phoneNumber,
        email: chat.dataValues.email,
        description: "",
        uri: "",
      });
    }
    return await sendMessageText(phoneNumber, description.message);
  };

  const createFormPaymentMobile = async (bank: string) => {
    const chat = await ChatModels.findOne({
      where: {
        phoneNumber,
        open: true,
      },
    });
    if (chat) {
      await FormSupportModels.create({
        email: chat.dataValues.email,
        type: "paymentMobile",
        phoneNumber,
        bank,
      });
    }
    return await sendMessageText(
      phoneNumber,
      dbMessages.form.paymentMobile.reference.message
    );
  };

  switch (replyId) {
    case "1":
      // ? envía el formulario de no puedo ingresa a soporte
      return await sendFormSupport();

    case "2":
      return await sendMessageInteractive(
        phoneNumber,
        dbMessages.didNotDisplayPayment
      );

    case "3":
      // ? crear formulario de otros problema
      return await createFormAnother();

    case "6":
      return await sendMessageInteractive(phoneNumber, dbMessages.main);

    case "7":
      return await closeConversation();

    case "8":
      return await sendMessageInteractive(phoneNumber, dbMessages.continue);

    case "11":
      await sendMessageText(
        phoneNumber,
        dbMessages.visualizePaymentZelle.message
      );
      return await sendMessageInteractive(phoneNumber, dbMessages.resolveDoubt);

    case "12":
      await sendMessageText(
        phoneNumber,
        dbMessages.visualizePaymentMobile.message
      );
      return await sendMessageInteractive(
        phoneNumber,
        dbMessages.resolveDoubtPaymentMobile
      );

    case "13":
      await sendMessageText(phoneNumber, dbMessages.validatePayment.message);
      return await sendMessageInteractive(phoneNumber, dbMessages.continue);

    case "20":
      return await sendMessageInteractive(phoneNumber, dbMessages.typeBank);

    case "21":
      return await createFormPaymentMobile("Bancamiga");

    case "22":
      return await createFormPaymentMobile("BFC");

    case "23":
      await sendMessageText(phoneNumber, dbMessages.otherBank.message);
      return await sendMessageInteractive(phoneNumber, dbMessages.continue);

    default:
      break;
  }

  // const sendFormSupport = async () => {
  //   const formSupport = await FormSupportModels.findOne({
  //     where: {
  //       phoneNumber: message.from,
  //       open: true,
  //     },
  //   });
  //   if (formSupport) {
  //     await formSupport.update({ open: false });
  //   }
  //   await sendMessageText(from, dbMessages.response.confirm.message);
  //   return await sendMessageInteractive(from, dbMessages.continueConversation);
  // };
  // const resetFormSupport = async () => {
  //   const formSupport = await FormSupportModels.findOne({
  //     where: {
  //       phoneNumber: message.from,
  //       open: true,
  //     },
  //   });
  //   if (formSupport) {
  //     await formSupport.update({
  //       open: true,
  //       locator: "",
  //       amount: "",
  //       reference: "",
  //     });
  //   }
  //   return await sendMessageText(from, dbMessages.form.locator.message);
  // };
  // switch (replyId) {
  //   // ? Response 1 --> 11 --> 111
  //   case "1":
  //     console.log("🚀 ~ responseMessageInteractive ~ message:", message);
  //     return await sendMessageInteractive(from, dbMessages.response.res1);
  //   case "11":
  //     return await sendMessageInteractive(from, dbMessages.response.res11);
  //   case "12":
  //     await sendMessageText(from, dbMessages.response.res12.message);
  //     return await sendMessageInteractive(
  //       from,
  //       dbMessages.continueConversation
  //     );
  //   case "111":
  //     await sendMessageText(from, dbMessages.response.res111.message);
  //     return await sendMessageInteractive(
  //       from,
  //       dbMessages.continueConversation
  //     );
  //   case "112":
  //     await sendMessageText(from, dbMessages.response.res112.message);
  //     return await sendMessageInteractive(
  //       from,
  //       dbMessages.continueConversation
  //     );
  //   // ? Response 2 --> 22 --> 222
  //   case "2":
  //     return await sendMessageInteractive(from, dbMessages.response.res2);
  //   case "21":
  //     await sendMessageText(from, dbMessages.response.res21.message);
  //     return await sendMessageInteractive(
  //       from,
  //       dbMessages.continueConversation
  //     );
  //   case "22":
  //     await sendMessageText(from, dbMessages.response.res22.message);
  //     return await sendMessageInteractive(
  //       from,
  //       dbMessages.continueConversation
  //     );
  //   case "23":
  //     await sendMessageText(from, dbMessages.response.res23.message);
  //     return await sendMessageInteractive(
  //       from,
  //       dbMessages.continueConversation
  //     );
  //   case "24":
  //     await sendMessageText(from, dbMessages.response.res24.message);
  //     return await sendMessageInteractive(
  //       from,
  //       dbMessages.continueConversation
  //     );
  //   // ? Response 3 --> 33 --> 333
  //   case "3":
  //     await sendMessageText(from, dbMessages.response.res3.message);
  //     return await sendMessageInteractive(from, dbMessages.resolved3);
  //   case "31":
  //     return await sendMessageInteractive(
  //       from,
  //       dbMessages.continueConversation
  //     );
  //   case "32":
  //     return await createdFormSupport();
  //   // ? Response 4 --> 44 --> 444
  //   case "4":
  //     return await sendMessageInteractive(
  //       from,
  //       dbMessages.continueConversation
  //     );
  //   case "41":
  //     return await sendMessageInteractive(from, dbMessages.welcome);
  //   case "42":
  //     return await sendMessageText(from, dbMessages.goodBye.message);
  //   // ? Response de form
  //   case "form_1":
  //     return await sendFormSupport();
  //   case "form_2":
  //     return await resetFormSupport();
  //   default:
  //     return await sendMessageInteractive(from, dbMessages.welcome);
  // }
};

export default responseMessageInteractive;
