export const validReference = (text: string) => {
  if (text.length < 6) {
    return "La referencia debe de ser mayor de 6 caracteres";
  }

  return false;
};

export const validLocator = (text: string) => {
  if (text.length < 6) {
    return "El localizador debe de ser mayor de 6 caracteres";
  }

  return false;
};

export const validNumberPhone = (text: string) => {
  if (text.length < 10) {
    return "Debe de ser un Número de teléfono valido";
  }
  return false;
};

export const validAmount = (text: string) => {
  if (Number(text)) {
    return false;
  }
  return "Debe de ser un monto valido";
};
