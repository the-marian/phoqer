export interface Theme {
  fr: (value: number) => string;
  border: (value: number, color: string) => string;
  rem: (one: number, two?: number, three?: number, four?: number) => string;
  em: (one: number, two?: number, three?: number, four?: number) => string;
  radius: string;
  shadow: string[];
  palette: {
    white: '#FFFFFF';
    black: '#242424';
    gray: string[];
    modal: string;
  };
  text: {
    color: {
      white: '#FFFFFF';
      black: '#242424';
    };
    family: string;
    weight: [200, 300, 400, 500, 600, 700];
  };
  transitions: string[];
}

export const theme: Theme = {
  fr: (value: number): string => Array(value).fill('1fr').join(' '),
  border: (value: number, color: string) => `${value}rem solid ${color}`,
  rem: (one: number, two?: number, three?: number, four?: number): string =>
    `${one}rem${two || two === 0 ? ` ${two}rem` : ''}${
      three || three === 0 ? ` ${three}rem` : ''
    }${four || four === 0 ? ` ${four}rem` : ''}`,
  em: (one: number, two?: number, three?: number, four?: number): string =>
    `${one}em${two || two === 0 ? ` ${two}em` : ''}${
      three || three === 0 ? ` ${three}em` : ''
    }${four || four === 0 ? ` ${four}em` : ''}`,
  radius: '0.4rem',
  shadow: [
    '0 0.1rem 0.3rem rgba(0,0,0,0.12), 0 0.1rem 0.2rem rgba(0,0,0,0.24)',
    '0 0.3rem 0.6rem rgba(0,0,0,0.16), 0 0.3rem 0.6rem rgba(0,0,0,0.23)',
    '0 1rem 2rem rgba(0,0,0,0.19), 0 0.6rem 0.6rem rgba(0,0,0,0.23)',
    '0 1.4rem 2.8rem rgba(0,0,0,0.05), 0 1rem 1rem rgba(0,0,0,0.02)',
    '0 1.9rem 3.8rem rgba(0,0,0,0.30), 0 1.5rem 1.2rem rgba(0,0,0,0.22)',
  ],
  palette: {
    white: '#FFFFFF',
    black: '#242424',
    gray: ['#EEEEEE', '#C4C4C4', '#999999', '#444444'],
    modal: 'rgba(0, 0, 0, 0.8)',
  },
  text: {
    color: {
      white: '#FFFFFF',
      black: '#242424',
    },
    family: 'Montserrat, sans-serif',
    weight: [200, 300, 400, 500, 600, 700],
  },
  transitions: ['0.3s cubic-bezier(0.4, 0, 0.2, 1)'],
};
