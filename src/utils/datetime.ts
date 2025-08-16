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

export function timeAgo(isoDate: Date | string) {
  const date = new Date(isoDate);
  const now = new Date();

  if (isNaN(date.getTime())) return null;

  const second = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (second < 60) return 'Just now';

  const minutes = Math.floor(second / 60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(second / 3600);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(second / 86400);
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} weeks ago`;

  const months =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(months / 12);
  return `${years} year ago`;
}
