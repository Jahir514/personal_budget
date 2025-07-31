export const formatAndValidateBDPhone = (phone: string): string | null => {
  // Remove spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-()]/g, '');

  // Convert +880 or 880 to 01 format
  let formatted = cleanPhone;
  if (formatted.startsWith('+880')) {
    formatted = '0' + formatted.slice(4);
  } else if (formatted.startsWith('880')) {
    formatted = '0' + formatted.slice(3);
  }

  const bdPhoneRegex = /^01[0-9]{9}$/;
  return bdPhoneRegex.test(formatted) ? formatted : null;
};
