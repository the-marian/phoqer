import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { Tag } from './data-display';
import { Alert } from './feedback';
import { Button, Checkbox, Input, Menu, Textarea } from './inputs';
import { Container } from './layout';
import { global } from './styles';
import { Text, Heading, FormLabel } from './typography';

export const theme = extendTheme({
    styles: {
        global,
    },

    fonts: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
    },

    config: {
        initialColorMode: 'system',
        useSystemColorMode: false,
    },

    breakpoints: {
        sm: '320px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
        '2xl': '1536px',
        '3xl': '2000px',
        '4xl': '2500px',
    },

    colors,

    components: {
        Alert,
        Heading,
        Text,
        FormLabel,
        Button,
        Checkbox,
        Input,
        Textarea,
        Container,
        Tag,
        Menu,
    },
});
