export const makeId = () => {
  return Math.floor(Math.random() * 99999 + 1) + "";
};

export const isValidString = (input) => {
  const regex = /^[a-zA-Z0-9 ]*$/;
  return regex.test(input);
};
