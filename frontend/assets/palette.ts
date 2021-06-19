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
    green: {
        white: '#FFFFFF',
        black: ['#222222', '#242424'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(255, 255, 255, 0.8)', 'rgba(250, 250, 250, 0.8)'],
        gray: ['#f9f9f9', '#e0e0e8', '#909bac', '#999999', '#444444'],
        red: ['#DB162F'],
        green: ['#227dcc'],
        grad: ['#c9f5e6', '#f5faf4', '#cfeaca'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#32603f', '#32603f'],
        secondary: ['#dfece2'],
        modal: 'rgba(0, 0, 0, 0.3)',
        shadowBorder: '0 0 0 0.1rem #e0e0e8',
    },
    blue: {
        white: '#FFFFFF',
        black: ['#222222', '#242424'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(255, 255, 255, 0.8)', 'rgba(250, 250, 250, 0.8)'],
        gray: ['#f9f9f9', '#e0e0e8', '#909bac', '#999999', '#444444'],
        red: ['#DB162F'],
        green: ['#22cc52'],
        grad: ['#cbddff', '#eaedf6', '#e6ecf5', '#b1d5ff'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#007aff', '#0040ff'],
        secondary: ['#e3ecf6'],
        modal: 'rgba(0, 0, 0, 0.3)',
        shadowBorder: '0 0 0 0.1rem #e0e0e8',
    },
    aqua: {
        white: '#FFFFFF',
        black: ['#222222', '#242424'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(255, 255, 255, 0.8)', 'rgba(250, 250, 250, 0.8)'],
        gray: ['#f9f9f9', '#e0e0e8', '#909bac', '#999999', '#444444'],
        red: ['#DB162F'],
        green: ['#22cc52'],
        grad: ['#8fd4d9', '#effcfc', '#edfcfc', '#a1e7e7'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#007991', '#007991'],
        secondary: ['#e3f4f6'],
        modal: 'rgba(0, 0, 0, 0.3)',
        shadowBorder: '0 0 0 0.1rem #e0e0e8',
    },
    red: {
        white: '#FFFFFF',
        black: ['#222222', '#242424'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(255, 255, 255, 0.8)', 'rgba(250, 250, 250, 0.8)'],
        gray: ['#f9f9f9', '#e0e0e8', '#909bac', '#999999', '#444444'],
        red: ['#bc031b'],
        green: ['#22cc52'],
        grad: ['#efbcbc', '#fdf7f7', '#fff4f4', '#e2afb2'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#f80759', '#d2343d'],
        secondary: ['#f5e7e7'],
        modal: 'rgba(0, 0, 0, 0.3)',
        shadowBorder: '0 0 0 0.1rem #e0e0e8',
    },
    violet: {
        white: '#FFFFFF',
        black: ['#222222', '#242424'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(255, 255, 255, 0.8)', 'rgba(250, 250, 250, 0.8)'],
        gray: ['#f9f9f9', '#e0e0e8', '#909bac', '#999999', '#444444'],
        red: ['#DB162F'],
        green: ['#22cc52'],
        grad: ['#c2b2e7', '#ece8ef', '#efeaf1', '#b7a4dd'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#6704be', '#54039b'],
        secondary: ['#f4edfa'],
        modal: 'rgba(0, 0, 0, 0.3)',
        shadowBorder: '0 0 0 0.1rem #e0e0e8',
    },
    'black-orange': {
        white: '#222222',
        black: ['#FFFFFF', '#FEFEFE'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(100, 100, 100, 0.8)', 'rgba(50, 50, 50, 0.8)'],
        gray: ['#343434', '#454545', '#999999', '#AAAAAA', '#AAAAAA'],
        red: ['#DB162F'],
        green: ['#22cc52'],
        grad: ['#e05a00', '#e06800', '#e0c200'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#e06800', '#ae5000'],
        secondary: ['#454545'],
        modal: 'rgba(0, 0, 0, 0.3)',
        shadowBorder: '0 0 0 0.1rem #454545',
    },
    'black-green': {
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
    'black-aqua': {
        white: '#222222',
        black: ['#FFFFFF', '#FEFEFE'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(100, 100, 100, 0.8)', 'rgba(50, 50, 50, 0.8)'],
        gray: ['#343434', '#454545', '#999999', '#AAAAAA', '#AAAAAA'],
        red: ['#DB162F'],
        green: ['#22cc52'],
        grad: ['#03ae6a', '#007991', '#036aae'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#1397b3', '#007991'],
        secondary: ['#454545'],
        modal: 'rgba(0, 0, 0, 0.3)',
        shadowBorder: '0 0 0 0.1rem #454545',
    },
    'black-blue': {
        white: '#222222',
        black: ['#FFFFFF', '#FEFEFE'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(100, 100, 100, 0.8)', 'rgba(50, 50, 50, 0.8)'],
        gray: ['#343434', '#454545', '#999999', '#AAAAAA', '#AAAAAA'],
        red: ['#DB162F'],
        green: ['#22cc52'],
        grad: ['#00d9ff', '#007aff', '#5900ff'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#007aff', '#0040ff'],
        secondary: ['#454545'],
        modal: 'rgba(0, 0, 0, 0.3)',
        shadowBorder: '0 0 0 0.1rem #454545',
    },
    'black-violet': {
        white: '#222222',
        black: ['#FFFFFF', '#FEFEFE'],
        trueWhite: '#FFFFFF',
        trueBlack: '#222222',
        glass: ['rgba(100, 100, 100, 0.8)', 'rgba(50, 50, 50, 0.8)'],
        gray: ['#343434', '#454545', '#999999', '#AAAAAA', '#AAAAAA'],
        red: ['#DB162F'],
        green: ['#22cc52'],
        grad: ['#7b43ff', '#ff43e6', '#ff438e'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#ff43e6', '#9d43de'],
        secondary: ['#565356'],
        modal: 'rgba(0,0,0,0.3)',
        shadowBorder: '0 0 0 0.1rem #454545',
    },
};

export default palette;
