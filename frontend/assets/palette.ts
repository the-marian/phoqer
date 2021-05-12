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
        grad: ['#e4ecdf', '#dfece2', '#dfecec'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#32603f', '#32603f'],
        secondary: ['#dfece2'],
        modal: 'rgba(0, 0, 0, 0.3)',
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
        grad: ['#e3f6f4', '#e3ecf6', '#eae3f6'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#007aff', '#0040ff'],
        secondary: ['#e3ecf6'],
        modal: 'rgba(0, 0, 0, 0.3)',
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
        grad: ['#e3f6ed', '#e3f4f6', '#e3eaf6'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#03a8ae', '#03a8ae'],
        secondary: ['#e3f4f6'],
        modal: 'rgba(0, 0, 0, 0.3)',
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
        grad: ['#edf7fa', '#fbe6fd', '#e8e2f6'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#6704be', '#54039b'],
        secondary: ['#f4edfa'],
        modal: 'rgba(0, 0, 0, 0.3)',
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
        grad: ['#03ae6a', '#03a8ae', '#036aae'],
        yellow: ['#EDBF18', '#FAF0CA'],
        primary: ['#03a8ae', '#03a8ae'],
        secondary: ['#454545'],
        modal: 'rgba(0, 0, 0, 0.3)',
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
    },
};

export default palette;
