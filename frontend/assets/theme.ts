export interface Theme {
    fr: (value: number) => string;
    border: (value: number, color: string) => string;
    rem: (one: number, two?: number, three?: number, four?: number) => string;
    em: (one: number, two?: number, three?: number, four?: number) => string;
    radius: string;
    shadow: string[];
    palette: {
        white: string;
        black: string[];
        gray: string[];
        red: string[];
        green: string[];
        soft: string[];
        grad: string[];
        yellow: string[];
        primary: string[];
        secondary: string[];
        modal: string;
    };
    text: {
        family: string;
        weight: [200, 300, 400, 500, 600, 700];
    };
    transitions: string[];
}

export const theme: Theme = {
    fr: (value: number): string => Array(value).fill('1fr').join(' '),
    border: (value: number, color: string) => `${value}rem solid ${color}`,
    rem: (one: number, two?: number, three?: number, four?: number): string =>
        `${one}rem${two || two === 0 ? ` ${two}rem` : ''}${three || three === 0 ? ` ${three}rem` : ''}${
            four || four === 0 ? ` ${four}rem` : ''
        }`,
    em: (one: number, two?: number, three?: number, four?: number): string =>
        `${one}em${two || two === 0 ? ` ${two}em` : ''}${three || three === 0 ? ` ${three}em` : ''}${
            four || four === 0 ? ` ${four}em` : ''
        }`,
    radius: '0.6rem',
    shadow: [
        '0 0.2rem 0.4rem rgba(0,0,0,0.04), 0 0.2rem 0.4rem rgba(0,0,0,0.08)',
        '0 0.3rem 0.6rem rgba(0,0,0,0.06), 0 0.3rem 0.6rem rgba(0,0,0,0.1)',
        '0 1rem 2rem rgba(0,0,0,0.08), 0 0.6rem 0.6rem rgba(0,0,0,0.1)',
        '0 1.4rem 2.8rem rgba(0,0,0,0.08), 0 1rem 1rem rgba(0,0,0,0.12)',
        '0 1.9rem 3.8rem rgba(0,0,0,0.1), 0 1.5rem 1.2rem rgba(0,0,0,0.12)',
    ],
    palette: {
        white: '#FFFFFF',
        black: ['#222222', '#242424'],
        gray: ['#F9F9F9', '#EEEEEE', '#C4C4C4', '#999999', '#444444'],
        red: ['#DB162F'],
        green: ['#22cc52'],
        soft: [
            'linear-gradient(154deg,#fff8e0,#fbddd7)',
            'linear-gradient(172deg,#faffd4,#88e4b8)',
            'linear-gradient(168deg,#f9ecff,#ddfcf8)',
            'linear-gradient(159deg,#e9c4ff,#ffd0d0)',
            'linear-gradient(168deg,#ddf9ff,#cfc6ff)',
            'linear-gradient(168deg,#e9ffea,#d1ddf7)',
        ],
        grad: [
            'linear-gradient(90deg, #007CF0, #00DFD8)',
            'linear-gradient(90deg, #7928CA, #FF0080)',
            'linear-gradient(90deg, #FF4D4D, #F9CB28)',
        ],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#764A8D', '#C39ADA', 'linear-gradient(93.32deg, #C39ADA 0%, #764A8D 100%)'],
        secondary: ['#EDFBC9', '#CCDD9F', 'linear-gradient(93.4deg, #EDFBC9 0%, #E5F4BF 23.83%, #CCDD9F 100%)'],
        modal: 'rgba(0, 0, 0, 0.3)',
    },
    text: {
        family: 'Montserrat, sans-serif',
        weight: [200, 300, 400, 500, 600, 700],
    },
    transitions: ['0.3s cubic-bezier(0.4, 0, 0.2, 1)'],
};
