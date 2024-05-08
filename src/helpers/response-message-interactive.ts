import { ChatModels, FormSupportModels } from "../models";
import { dbMessages } from "../db/messages";
import { IMessage } from "../types/webhook";
//
import { dataFormSupport, sendFormSupport } from "./send-form-support";
import sendMessageInteractive from "./send-message-interactive";
import sendMessageText from "./send-message-text";

const responseMessageInteractive = async (message: IMessage) => {
  const { from: phoneNumber, interactive } = message;
  const replyId = interactive?.list_reply?.id || interactive?.button_reply?.id;

  // ? Enviar form a soporte de no puedo ingresar a la plataforma
  const sendFormSupportAccessDenied = async () => {
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
        concept: "No puedo ingresar",
        description: `Usuario no puede ingresar a la plataforma con el correo: ${email}`,
      };
      await sendFormSupport(data);
      await sendMessageText(phoneNumber, dbMessages.support.message);
      return await sendMessageInteractive(phoneNumber, dbMessages.continue);
    }
  };

  // ? cierra la conversación y envía mensaje de dependida
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

  // ? Inicializa un form de soporte type (otro)
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

  // ? Inicializa un form de soporte type (Pago móvil)
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

  // ? Inicializa un form de soporte type (Zelle)
  const createFormZelle = async () => {
    const chat = await ChatModels.findOne({
      where: {
        phoneNumber,
        open: true,
      },
    });
    if (chat) {
      await FormSupportModels.create({
        email: chat.dataValues.email,
        type: "zelle",
        phoneNumber,
      });
    }
    return await sendMessageText(
      phoneNumber,
      dbMessages.form.zelle.reference.message
    );
  };

  // ? reiniciar form de soporte
  const resetForm = async () => {
    const form = await FormSupportModels.findOne({
      where: {
        phoneNumber,
        open: false,
        send: true,
      },
    });
    if (form) {
      form.update({
        send: false,
        open: true,
        reference: "",
        locator: "",
        amount: "",
        uri: "",
        issuerNumber: "",
        description: "",
      });
      switch (form.dataValues.type) {
        case "zelle":
          return await sendMessageText(
            phoneNumber,
            dbMessages.form.zelle.reference.message
          );

        case "paymentMobile":
          return await sendMessageText(
            phoneNumber,
            dbMessages.form.paymentMobile.reference.message
          );

        case "other":
          return await sendMessageText(
            phoneNumber,
            dbMessages.form.other.description.message
          );

        default:
          return;
      }
    }
    return;
  };

  switch (replyId) {
    case "1":
      // ? envía el formulario de no puedo ingresa a soporte
      return await sendFormSupportAccessDenied();

    case "2":
      return await sendMessageInteractive(
        phoneNumber,
        dbMessages.didNotDisplayPayment
      );

    case "3":
      // ? crear formulario de otros problema
      return await createFormAnother();

    case "4":
      // ? Envía formulario a soporte
      const body = await dataFormSupport(phoneNumber);
      if (body) {
        await sendFormSupport(body);
      }
      await sendMessageText(phoneNumber, dbMessages.support.message);
      return await sendMessageInteractive(phoneNumber, dbMessages.continue);

    case "5":
      return await resetForm();

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
      return await sendMessageInteractive(
        phoneNumber,
        dbMessages.resolveDoubtZelle
      );

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

    case "25":
      return await createFormZelle();

    default:
      return await sendMessageInteractive(phoneNumber, dbMessages.main);
  }
};

export default responseMessageInteractive;
