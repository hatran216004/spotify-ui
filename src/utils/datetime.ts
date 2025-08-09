import { format } from 'date-fns';

export const formatDate = (date: string | Date) => {
  return format(date, 'yyy-MM-dd');
};

export const trackTimeFormat = (seconds: number) => {
  const ms = seconds * 1000;
  if (seconds > 3600) {
    return format(ms, 'H:mm:ss');
  }
  return format(ms, 'm:ss');
};
