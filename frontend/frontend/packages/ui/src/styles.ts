export const global = {
    body: {
        minHeight: '100vh',
        background: 'light.body',

        _dark: {
            background: 'dark.body',
        },
    },
    '#__next': {
        minHeight: '100vh',
    },
    '.description': {
        width: '100%',
        fontSize: 'sm',
        color: 'text.main',
        _dark: {
            color: 'common.white',
        },

        p: {
            lineHeight: '1.6',
            fontWeight: 400,
        },

        'h2, h3, h4, h5, h6': {
            fontWeight: 600,
            lineHeight: '1.6',
            fontSize: 'md',
        },

        h2: {
            fontSize: 'lg',
            lineHeight: '1.4',
        },

        '.ql-header[value="2"] svg': {
            display: 'none',
        },

        '.ql-header': {
            position: 'relative',
            _hover: {
                '::after': {
                    color: 'var(--chakra-colors-gray-300)',
                },
            },

            '&.ql-active::after': {
                color: 'var(--chakra-colors-green-500)',
            },
        },

        '.ql-header::after': {
            position: 'absolute',
            top: '48%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontWeight: 600,
            fontSize: '16px',
            color: 'var(--chakra-colors-gray-500)',
        },

        '.ql-active svg .ql-fill': {
            fill: 'var(--chakra-colors-green-500) !important',
        },

        '.ql-active svg .ql-stroke': {
            stroke: 'var(--chakra-colors-green-500) !important',
        },

        '.ql-header[value="2"]::after': {
            content: '"H1"',
        },

        '.ql-header[value="3"]::after': {
            content: '"H2"',
        },

        'h4, h5, h6': {
            fontSize: 'md',
        },

        'strong, b': {
            fontWeight: 600,
        },

        'p, ol, ul, pre, blockquote, h1, h2, h3, h4, h5, h6': {
            margin: '0',
            padding: '0',
            counterReset: 'list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
        },
        'ol, ul': {
            paddingLeft: '1.5em',
        },
        'ol > li, ul > li': {
            listStyleType: 'none',
            marginBottom: '0.5rem',
        },
        'ul > li::before': {
            content: "''",
        },
        'ul > li': {
            position: 'relative',
        },
        'ul > li::after': {
            content: "''",
            position: 'absolute',
            left: '1rem',
            top: '1rem',
            height: '0.5rem',
            width: '0.5rem',
            background: 'common.black',
        },
        'li::before': {
            display: 'inline-block',
            whiteSpace: 'nowrap',
            width: '1.2em',
        },
        'li:not(.ql-direction-rtl)::before': {
            marginLeft: '-1.5em',
            marginRight: '0.3em',
            textAlign: 'right',
        },
        'li.ql-direction-rtl::before': {
            marginLeft: '0.3em',
            marginRight: '-1.5em',
        },
        'ol li:not(.ql-direction-rtl), ul li:not(.ql-direction-rtl)': {
            paddingLeft: '1.5em',
        },
        'ol li.ql-direction-rtl, ul li.ql-direction-rtl': {
            paddingRight: '1.5em',
        },
        'ol li': {
            counterReset: 'list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
            counterIncrement: 'list-0',
        },
        'ol li:before': {
            content: 'counter(list-0, decimal) ". "',
        },
        'ol li.ql-indent-1': {
            counterIncrement: 'list-1',
            counterReset: 'list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
        },
        'ol li.ql-indent-1:before': {
            content: 'counter(list-1, lower-alpha) ". "',
        },
        'ol li.ql-indent-2': {
            counterIncrement: 'list-2',
            counterReset: 'list-3 list-4 list-5 list-6 list-7 list-8 list-9',
        },
        'ol li.ql-indent-2:before': {
            content: 'counter(list-2, lower-roman) ". "',
        },
        'ol li.ql-indent-3': {
            counterIncrement: 'list-3',
            counterReset: 'list-4 list-5 list-6 list-7 list-8 list-9',
        },
        'ol li.ql-indent-3:before': {
            content: 'counter(list-3, decimal) ". "',
        },
        'ol li.ql-indent-4': {
            counterIncrement: 'list-4',
            counterReset: 'list-5 list-6 list-7 list-8 list-9',
        },
        'ol li.ql-indent-4:before': {
            content: 'counter(list-4, lower-alpha) ". "',
        },
        'ol li.ql-indent-5': {
            counterIncrement: 'list-5',
            counterReset: 'list-6 list-7 list-8 list-9',
        },
        'ol li.ql-indent-5:before': {
            content: 'counter(list-5, lower-roman) ". "',
        },

        'ol li.ql-indent-6': {
            counterIncrement: 'list-6',
            counterReset: 'list-7 list-8 list-9',
        },
        'ol li.ql-indent-6:before': {
            content: 'counter(list-6, decimal) ". "',
        },

        'ol li.ql-indent-7': {
            counterIncrement: 'list-7',
            counterReset: 'list-8 list-9',
        },
        'ol li.ql-indent-7:before': {
            content: 'counter(list-7, lower-alpha) ". "',
        },
        'ol li.ql-indent-8': {
            counterIncrement: 'list-8',
            counterReset: 'list-9',
        },
        'ol li.ql-indent-8:before': {
            content: 'counter(list-8, lower-roman) ". "',
        },
        'ol li.ql-indent-9': {
            counterIncrement: 'list-9',
        },
        'ol li.ql-indent-9:before': {
            content: 'counter(list-9, decimal) ". "',
        },
        '.ql-indent-1:not(.ql-direction-rtl)': {
            paddingLeft: '3em',
        },
        'li.ql-indent-1:not(.ql-direction-rtl)': {
            paddingLeft: '4.5em',
        },
        '.ql-indent-1.ql-direction-rtl.ql-align-right': {
            paddingRight: '3em',
        },
        'li.ql-indent-1.ql-direction-rtl.ql-align-right': {
            paddingRight: '4.5em',
        },
        '.ql-indent-2:not(.ql-direction-rtl)': {
            paddingLeft: '6em',
        },
        'li.ql-indent-2:not(.ql-direction-rtl)': {
            paddingLeft: '7.5em',
        },
        '.ql-indent-2.ql-direction-rtl.ql-align-right': {
            paddingRight: '6em',
        },
        'li.ql-indent-2.ql-direction-rtl.ql-align-right': {
            paddingRight: '7.5em',
        },
        '.ql-indent-3:not(.ql-direction-rtl)': {
            paddingLeft: '9em',
        },
        'li.ql-indent-3:not(.ql-direction-rtl)': {
            paddingLeft: '10.5em',
        },
        '.ql-indent-3.ql-direction-rtl.ql-align-right': {
            paddingRight: '9em',
        },
        'li.ql-indent-3.ql-direction-rtl.ql-align-right': {
            paddingRight: '10.5em',
        },
        '.ql-indent-4:not(.ql-direction-rtl)': {
            paddingLeft: '12em',
        },
        'li.ql-indent-4:not(.ql-direction-rtl)': {
            paddingLeft: '13.5em',
        },
        '.ql-indent-4.ql-direction-rtl.ql-align-right': {
            paddingRight: '12em',
        },
        'li.ql-indent-4.ql-direction-rtl.ql-align-right': {
            paddingRight: '13.5em',
        },
        '.ql-indent-5:not(.ql-direction-rtl)': {
            paddingLeft: '15em',
        },
        'li.ql-indent-5:not(.ql-direction-rtl)': {
            paddingLeft: '16.5em',
        },
        '.ql-indent-5.ql-direction-rtl.ql-align-right': {
            paddingRight: '15em',
        },
        'li.ql-indent-5.ql-direction-rtl.ql-align-right': {
            paddingRight: '16.5em',
        },
        '.ql-indent-6:not(.ql-direction-rtl)': {
            paddingLeft: '18em',
        },
        'li.ql-indent-6:not(.ql-direction-rtl)': {
            paddingLeft: '19.5em',
        },
        '.ql-indent-6.ql-direction-rtl.ql-align-right': {
            paddingRight: '18em',
        },
        'li.ql-indent-6.ql-direction-rtl.ql-align-right': {
            paddingRight: '19.5em',
        },
        '.ql-indent-7:not(.ql-direction-rtl)': {
            paddingLeft: '21em',
        },
        'li.ql-indent-7:not(.ql-direction-rtl)': {
            paddingLeft: '22.5em',
        },
        '.ql-indent-7.ql-direction-rtl.ql-align-right': {
            paddingRight: '21em',
        },
        'li.ql-indent-7.ql-direction-rtl.ql-align-right': {
            paddingRight: '22.5em',
        },
        '.ql-indent-8:not(.ql-direction-rtl)': {
            paddingLeft: '24em',
        },
        'li.ql-indent-8:not(.ql-direction-rtl)': {
            paddingLeft: '25.5em',
        },
        '.ql-indent-8.ql-direction-rtl.ql-align-right': {
            paddingRight: '24em',
        },
        'li.ql-indent-8.ql-direction-rtl.ql-align-right': {
            paddingRight: '25.5em',
        },
        '.ql-indent-9:not(.ql-direction-rtl)': {
            paddingLeft: '27em',
        },
        'li.ql-indent-9:not(.ql-direction-rtl)': {
            paddingLeft: '28.5em',
        },
        '.ql-indent-9.ql-direction-rtl.ql-align-right': {
            paddingRight: '27em',
        },
        'li.ql-indent-9.ql-direction-rtl.ql-align-right': {
            paddingRight: '28.5em',
        },
    },
};
