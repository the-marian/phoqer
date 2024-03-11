export const stripHTML = (value: string): string => value.replace(/(<([^>]+)>)/gi, '');
