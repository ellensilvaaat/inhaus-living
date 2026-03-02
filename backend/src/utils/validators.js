export const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const australianPhoneRegex =
  /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;

export function validateEmail(email) {
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  if (!phone) return true; // opcional
  return australianPhoneRegex.test(phone);
}

export function validateRequiredFields(fields) {
  return fields.every(field => field && field.trim() !== '');
}
