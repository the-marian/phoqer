import { Themes } from '../interfaces';

interface IPalette {
    white: string;
    glass: string[];
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
}

export interface Theme {
    fr: (value: number) => string;
    border: (value: number, color: string) => string;
    rem: (one: number, two?: number, three?: number, four?: number) => string;
    em: (one: number, two?: number, three?: number, four?: number) => string;
    radius: string;
    shadow: string[];
    palette: IPalette;
    text: {
        family: string;
        weight: [200, 300, 400, 500, 600, 700];
    };
    transitions: string[];
    input: { [key: string]: string | { [key: string]: string } };
    outline: { [key: string]: string | { [key: string]: string } };
}

const palette: { [key: string]: IPalette } = {
    white: {
        white: '#FFFFFF',
        glass: ['rgba(255, 255, 255, 0.9)', 'rgba(250, 250, 250, 0.9)'],
        black: ['#222222', '#242424'],
        gray: ['#F9F9F9', '#EAEEF9', '#9E9E9E', '#999999', '#444444'],
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
        primary: ['#007aff', '#0040ff'],
        secondary: ['#EDFBC9'],
        modal: 'rgba(0, 0, 0, 0.7)',
    },
    black: {
        white: '#222222',
        glass: ['rgba(50, 50, 50, 0.9)', 'rgba(50, 50, 50, 0.9)'],
        black: ['#FFFFFF', '#FEFEFE'],
        gray: ['#343434', '#454545', '#999999', '#AAAAAA', '#AAAAAA'],
        red: ['#DB162F'],
        green: ['#22cc52'],
        soft: ['#454545', '#454545', '#454545', '#454545', '#454545', '#454545'],
        grad: [
            'linear-gradient(90deg, #007CF0, #00DFD8)',
            'linear-gradient(90deg, #7928CA, #FF0080)',
            'linear-gradient(90deg, #FF4D4D, #F9CB28)',
        ],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#007aff', '#0040ff'],
        secondary: ['#EDFBC9'],
        modal: 'rgba(0, 0, 0, 0.7)',
    },
};

export const theme = (value: Themes): Theme => ({
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
        '0 2rem 2.6rem rgba(0,0,0,0.015)',
        '0 0.1rem 0.2rem rgba(0,0,0,0.08)',
        '0 1rem 2rem rgba(0,0,0,0.08), 0 0.6rem 0.6rem rgba(0,0,0,0.1)',
        '0 1.4rem 2.8rem rgba(0,0,0,0.08), 0 1rem 1rem rgba(0,0,0,0.12)',
        '0 1.9rem 3.8rem rgba(0,0,0,0.1), 0 1.5rem 1.2rem rgba(0,0,0,0.12)',
    ],
    palette: palette[value],
    text: {
        family: 'Montserrat, sans-serif',
        weight: [200, 300, 400, 500, 600, 700],
    },
    transitions: ['0.3s cubic-bezier(0.4, 0, 0.2, 1)'],

    // templates
    input: {
        display: 'block',
        alignItems: 'center',
        height: '6rem',
        width: '100%',
        padding: '1rem 2rem',
        border: 'none',
        borderRadius: '0.6rem',
        fontSize: '1.2rem',
        transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '@media (max-width: 500px)': {
            fontSize: '1.6rem',
        },

        '&:focus': {
            boxShadow: '0 0 0 0.1rem #007aff',
        },
        '&:hover': {
            boxShadow: '0 0 0 0.1rem #007aff',
        },
    },
    outline: {
        transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',

        '&:focus': {
            boxShadow: '0 0 0 0.1rem #007aff',
        },
        '&:hover': {
            boxShadow: '0 0 0 0.1rem #007aff',
        },
    },
});
