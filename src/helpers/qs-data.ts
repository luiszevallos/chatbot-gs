import qs from "qs";
import { NUMBER_PHONE } from "../../config-global";

const QSData = async (destination: string, message: string) => {
  return qs.stringify({
    "src.name": "", // TODO POR DEFINIR
    source: NUMBER_PHONE,
    channel: "whatsapp",
    //
    destination: destination,
    message: message,
  });
};

export default QSData;
