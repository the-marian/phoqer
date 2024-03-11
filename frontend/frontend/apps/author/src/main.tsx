import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { theme } from 'ui';

import { AuthorApp } from './root/AuthorApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <AuthorApp />
        </ChakraProvider>
    </React.StrictMode>,
);
