export interface IPalette {
    white: string;
    black: string[];
    trueWhite: string;
    trueBlack: string;
    glass: string[];
    gray: string[];
    red: string[];
    green: string[];
    grad: string[];
    yellow: string[];
    primary: string[];
    secondary: string[];
    modal: string;
    shadowBorder: string;
}

const palette: { [key: string]: IPalette } = {
    white: {
        white: '#FFFFFF',
        black: ['#222222', '#242424'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(255, 255, 255, 0.8)', 'rgba(250, 250, 250, 0.8)'],
        gray: ['#f9f9f9', '#e0e0e8', '#909bac', '#999999', '#444444'],
        red: ['#DB162F'],
        green: ['#227dcc'],
        grad: ['#fef1ff', '#f4f6ff', '#f0fcf6'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#32603f', '#32603f'],
        secondary: ['#dfece2'],
        modal: 'rgba(0, 0, 0, 0.3)',
        shadowBorder: '0 0 0 0.1rem #e0e0e8',
    },
    black: {
        white: '#222222',
        black: ['#FFFFFF', '#FEFEFE'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(100, 100, 100, 0.8)', 'rgba(50, 50, 50, 0.8)'],
        gray: ['#343434', '#454545', '#999999', '#AAAAAA', '#AAAAAA'],
        red: ['#DB162F'],
        green: ['#227dcc'],
        grad: ['#47a53c', '#38ba61', '#20909f'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#3CA55C', '#239649'],
        secondary: ['#454545'],
        modal: 'rgba(0, 0, 0, 0.3)',
        shadowBorder: '0 0 0 0.1rem #454545',
    },
};

export default palette;
