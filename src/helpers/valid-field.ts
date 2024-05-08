export const validReference = (text: string) => {
  if (text.length < 6) {
    return "La referencia debe de ser mayor de 6 caracteres";
  }

  return false;
};

export const validLocator = (text: string) => {
  if (text.length < 6) {
    return "El localizador debe de ser mayor o igual de 6 letras";
  }
  if (/[0-9]/.test(text)) {
    return "El localizador no debe de contener número";
  }

  return false;
};

export const validNumberPhone = (text: string) => {
  if (text.length < 10) {
    return "Debe de ser un Número de teléfono valido";
  }
  if (/[a-zA-Z]\w+\w/.test(text)) {
    return "El número de teléfono no debe incluir letras";
  }
  return false;
};

export const validAmount = (text: string) => {
  if (/[a-zA-Z]\w+\w/.test(text)) {
    return "El monto no debe incluir letras";
  }
  return false;
};
