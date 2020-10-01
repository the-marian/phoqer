export interface Theme {
  rem: (value: number) => string;
  box: {
    two: (vert: number, horiz: number) => string;
    three: (vert1: number, horiz: number, vert2: number) => string;
    four: (
      vert1: number,
      horiz1: number,
      vert2: number,
      horiz2: number,
    ) => string;
  };
  radius: string;
  shadow: string[];
  palette: {
    white: '#FFFFFF';
    black: '#242424';
    gray: '#EEEEEE';
    modalBack: string;
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
  rem: (value: number): string => `${value}rem`,
  box: {
    two: (vert: number, horiz: number): string => `${vert}rem ${horiz}rem`,
    three: (vert1: number, horiz: number, vert2: number): string =>
      `${vert1}rem ${horiz}rem ${vert2}rem`,
    four: (
      vert1: number,
      horiz1: number,
      vert2: number,
      horiz2: number,
    ): string => `${vert1}rem ${horiz1}rem ${vert2}rem ${horiz2}rem`,
  },
  radius: '0.4rem',
  shadow: [
    '0 0.1rem 0.3rem rgba(0,0,0,0.12), 0 0.1rem 0.2rem rgba(0,0,0,0.24)',
    '0 0.3rem 0.6rem rgba(0,0,0,0.16), 0 0.3rem 0.6rem rgba(0,0,0,0.23)',
    '0 1rem 2rem rgba(0,0,0,0.19), 0 0.6rem 0.6rem rgba(0,0,0,0.23)',
    '0 1.4rem 2.8rem rgba(0,0,0,0.25), 0 1rem 1rem rgba(0,0,0,0.22)',
    '0 1.9rem 3.8rem rgba(0,0,0,0.30), 0 1.5rem 1.2rem rgba(0,0,0,0.22)',
  ],
  palette: {
    white: '#FFFFFF',
    black: '#242424',
    gray: '#EEEEEE',
    modalBack: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    color: {
      white: '#FFFFFF',
      black: '#242424',
    },
    family: 'Montserrat, sans-serif',
    weight: [200, 300, 400, 500, 600, 700],
  },
  transitions: ['3s cubic-bezier(0.4, 0, 0.2, 1)'],
};
