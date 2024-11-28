export const makeId = () => {
  return Math.floor(Math.random() * 99999 + 1) + "";
};

export const isValidString = (input) => {
  const regex = /^[a-zA-Z0-9 ]*$/;
  return regex.test(input);
};

export const createTemplate = (template, vars) => {
  let copiedTemplate = template;
  for (const key in vars) {
    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      const element = vars[key];
      // Replace all instances of the placeholder with the actual value
      copiedTemplate = copiedTemplate.replaceAll(`{{${key}}}`, element);
    }
  }
  return copiedTemplate;
};

export function addError(inputElement, errorMsg, message) {
  errorMsg.textContent = message;
  inputElement.style.border = "1px solid red";
  inputElement.before(errorMsg);
}

export function removeError(inputElement, errorMsg) {
  inputElement.style.border = "";
  if (errorMsg) {
    errorMsg.remove();
  }
}
