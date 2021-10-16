// cut string
export const cutString = (value: string, max: number): string => (value.length > max ? `${value.slice(0, max - 3)}...` : value);
