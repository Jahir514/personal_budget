export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const otpExpiry = (): Date => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 5);
  return expires;
};
