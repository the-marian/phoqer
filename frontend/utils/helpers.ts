export const addZeroToNumber = (value: string | number): string =>
  String(value).padStart(2, '0');
