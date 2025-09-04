/* eslint-disable @typescript-eslint/no-explicit-any */
import { SPOTIFY_COLORS } from '@/config/constant';
import { FileExtensions } from '@/types/utils.type';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(
  callback: T,
  timeout: number = 300
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};

export const validFileExtensions = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp']
} as const;

export const isValidFileType = <T extends keyof FileExtensions>(
  fileName: string,
  fileType: T
) => {
  if (!fileName) return false;
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (!ext) return false;
  return validFileExtensions[fileType].indexOf(ext as any) > -1;
};
