"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import sendMessageInteractive from "./send-message-interactive";
// import sendMessageText from "./send-message-text";
const responseMessageInteractive = (message) => __awaiter(void 0, void 0, void 0, function* () {
    // const { from, interactive } = message;
    // const replyId = interactive?.list_reply?.id || interactive?.button_reply?.id;
    // const createdFormSupport = async () => {
    //   await FormSupportModels.create({
    //     locator: "",
    //     amount: "",
    //     reference: "",
    //     phoneNumber: from,
    //   });
    //   return await sendMessageText(from, dbMessages.form.locator.message);
    // };
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
});
exports.default = responseMessageInteractive;
//# sourceMappingURL=response-message-interactive.js.map