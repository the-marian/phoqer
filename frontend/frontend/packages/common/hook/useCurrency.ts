export const currencyMap: Record<string, string> = {
    UAH: '₴',
    PLN: 'zł',
    USD: '$',
    EUR: '€',
};

export interface CurrencyFormat {
    format: (value: number, locale?: string, currency?: string) => string;
}
export const useCurrency = (): CurrencyFormat => {
    return {
        format(value: number, locale = 'en-US', currency = 'UAH'): string {
            const [int, fraction] = String(value).split('.');
            const intValue = Number(int).toLocaleString(locale);

            if (fraction) {
                const cents = '.' + fraction.slice(0, 2).padStart(2, '0');
                return intValue + cents + ' ' + currencyMap[currency];
            }

            return intValue + '.00 ' + currencyMap[currency];
        },
    };
};
