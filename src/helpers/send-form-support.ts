import axios from "axios";
import { HOST_API_SUPPORT } from "../../config-global";
import { FormSupportModels } from "../models";

type IData = {
  concept: string;
  description: string;
  phoneNumber: string;
  email: string;
  uri?: string;
};

export const dataFormSupport = async (phoneNumber: string) => {
  const form = await FormSupportModels.findOne({
    where: {
      phoneNumber,
      open: false,
      send: true,
    },
  });
  if (form) {
    const {
      type,
      description,
      phoneNumber,
      email,
      uri,
      bank,
      reference,
      locator,
      issuerNumber,
      amount,
    } = form.dataValues;
    switch (type) {
      case "other":
        return {
          concept: "Otro",
          description,
          phoneNumber,
          email,
          uri,
        };

      case "paymentMobile":
        return {
          phoneNumber,
          email,
          concept: "Pago móvil no validado",
          uri,
          description: `Datos ingresado \n\n*Banco*: ${bank} \n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Número emisor*: ${issuerNumber} \n*Monto*: ${amount}`,
        };

      case "zelle":
        return {
          phoneNumber,
          email,
          concept: "Pago Zelle no validado",
          uri,
          description: `Datos ingresado \n\n*Referencia*: ${reference} \n*Localizador*: ${locator} \n*Monto*: ${amount}`,
        };

      default:
        return null;
    }
  }
  return null;
};

export const sendFormSupport = async (data: IData) => {
  try {
    // TODO: conexión con soporte
    console.log("🚀 ~ sendFormSupport ~ data:", data);
    // const response = await axios.post(`${HOST_API_SUPPORT}`, data);
    // return response.data;
    return;
  } catch (error: any) {
    throw new Error(`${error?.message || error}`);
  }
};
