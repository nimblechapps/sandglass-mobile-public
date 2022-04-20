export const REGEX = {
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  SPECIAL_CHARECTERS: /^[\w&.\-]+$/,
  UPPERCASE: /[A-Z]/g,
  LOWERCASE: /[a-z]/g,
  UPPER_LOWER_CASE: /[a-z].*[A-Z]|[A-Z].*[a-z]/,
  NAME: /^[A-Za-z0-9]{1}[ A-Za-z0-9,.-]{0,}$/,
  ALPHANUMERIC: /^[A-Za-z0-9]{1,}$/,
  MIN_NUMBERS: "(^[0][1-9]+)|([1-9]d*)",
  NON_SPACE_CHARACTER: /^\S*$/,
};

export const validatePassword = (value, t) => {
  var message = [];
  var validCount = 0;
  if (value.length < 8) {
    message.push({ valid: false, title: t("minimumCharacters") });
  } else {
    message.push({ valid: true, title: t("minimumCharacters") });
    validCount++;
  }
  if (value.match(REGEX.SPECIAL_CHARECTERS)) {
    message.push({ valid: false, title: t("specialCharacter") });
  } else {
    message.push({ valid: true, title: t("specialCharacter") });
    validCount++;
  }
  if (!value.match(REGEX.MIN_NUMBERS)) {
    message.push({ valid: false, title: t("numericCharacter") });
  } else {
    message.push({ valid: true, title: t("numericCharacter") });
    validCount++;
  }
  if (!value.match(REGEX.UPPER_LOWER_CASE)) {
    message.push({ valid: false, title: t("uppercaseLowercase") });
  } else {
    message.push({ valid: true, title: t("uppercaseLowercase") });
    validCount++;
  }
  if (validCount > 4) {
    message = [];
  }
  // return message.length ? JSON.stringify(message) : null;
  return validCount < 4 ? JSON.stringify(message) : null;
};
