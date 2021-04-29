import { Styles } from 'jss';

import { Themes } from '../interfaces';
import palette, { IPalette } from './palette';

interface IMedia {
    max: (value: Styles) => Styles;
    min: (value: Styles) => Styles;
}

export interface Theme {
    fr: (value: number) => string;
    border: (value: number, color: string) => string;
    rem: (one: number, two?: number, three?: number, four?: number) => string;
    em: (one: number, two?: number, three?: number, four?: number) => string;
    radius: string;
    shadow: [string, string, string, string, string];
    palette: IPalette;
    media: (size: number) => IMedia;
    hover: (value: Styles) => Styles;
    focus: (value: Styles) => Styles;
    text: {
        family: string;
        weight: ['200', '300', '400', '500', '600', '700'];
    };
    transitions: [string, string];
}

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
        '0 0 20rem 0 rgba(0,0,0,0.2)',
    ],
    media: (size: number) => ({
        max: (value: Styles): Styles => ({ [`@media(max-width: ${size}px)`]: value }),
        min: (value: Styles): Styles => ({ [`@media(min-width: ${size}px)`]: value }),
    }),
    hover: (value: Styles): Styles => ({ '&:hover': value }),
    focus: (value: Styles): Styles => ({ '&:focus': value }),
    palette: palette[value],
    text: {
        family: 'Montserrat, sans-serif',
        weight: ['200', '300', '400', '500', '600', '700'],
    },
    transitions: ['0.2s cubic-bezier(0.4, 0, 0.2, 1)', '0.6s cubic-bezier(0.4, 0, 0.2, 1)'],
});
