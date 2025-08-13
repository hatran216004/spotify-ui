import { SPOTIFY_COLORS } from '@/config/constant';

export const isUsername = (value: string) => {
  const isUsername = /^[a-zA-Z0-9_]{3,30}$/.test(value);
  return isUsername;
};

export const isEmail = (value: string) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return isEmail;
};

export const isEmailOrUserName = (value: string) => {
  if (!value) return false;
  const isValidEmail = isEmail(value);
  const isValidUsername = isUsername(value);
  return isValidEmail || isValidUsername;
};

export const getRandomRGB = () => {
  const o = Math.round,
    r = Math.random,
    s = 255;

  return [o(r() * s), o(r() * s), o(r() * s), +r().toFixed(1)];
};

export const getRandomColor = () => {
  const randomColor =
    SPOTIFY_COLORS[Math.floor(Math.random() * SPOTIFY_COLORS.length)];
  return randomColor;
};
