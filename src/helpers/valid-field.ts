export const validReference = (text: string) => {
  if (text.trim().length > 6) {
    return "La referencia debe de ser mayor de 6 caracteres";
  }

  return false;
};

export const validLocator = (text: string) => {
  if (text.trim().length > 6) {
    return "El localizador debe de ser mayor de 6 caracteres";
  }

  return false;
};

export const validNumberPhone = (text: string) => {
  if (text.trim().length > 10 || text.includes("58")) {
    return "Debe de ser un Número de teléfono valido";
  }
  return false;
};

export const validAmount = (text: string) => {
  const currentAmount = text.replaceAll(",", ".");
  if (!Number(currentAmount)) {
    return "Debe de ser un monto valido";
  }
  return false;
};
