const validateCreationDate = (date: string | Date) => {
  const then = new Date(date);
  const now = new Date();
  const msBetweenDates = Math.abs(then.getTime() - now.getTime());
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

  return hoursBetweenDates < 2; // ? 2 hora para reiniciar el chat
};

export default validateCreationDate;
