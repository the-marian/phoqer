const addZeroToNumber = (value: string | number): string =>
  String(value).padStart(2, '0');

const formateDate = (ms: number): string => {
  const seconds: number = (Date.now() - ms) / 1000;
  
  // return 'a few seconds ago' if message was sent during last minut
  if (seconds < 60) return 'a few seconds ago';

  // return time in minuts if message was sent during last hour
  const minuts: number = seconds / 60;
  if (seconds > 60 && minuts < 60)
    return `${Math.ceil(minuts)} minuts ago`;

  // return time in hour if message was sent during last 24 hours
  const hours: number = minuts / 24;
  if (minuts > 60 && hours < 24)
    return `${Math.ceil(hours)} hours ago`;

  // else
  const date: Date = new Date(ms);
  return `${addZeroToNumber(date.getDate())}.${addZeroToNumber(
    date.getMonth()
  )}.${date.getFullYear()}  ${addZeroToNumber(
    date.getHours()
  )}:${addZeroToNumber(date.getMinutes())}`;
};

export default formateDate;
