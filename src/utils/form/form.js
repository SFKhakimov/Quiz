import isEmail from "validator/lib/isEmail";

export function checkValidate(value, validity) {
  let isValid = true;

  if (validity.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (validity.email) {
    isValid = isEmail(value) && isValid;
  }

  if (validity.minLength) {
    isValid = value.length >= validity.minLength && isValid;
  }

  return isValid;
}
