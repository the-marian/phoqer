export const cutString = (value: string, length: number): string =>
    value.length > length ? value.slice(0, length - 3) + '...' : value;
