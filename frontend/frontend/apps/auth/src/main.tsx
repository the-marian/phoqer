import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { theme } from 'ui';

import { AuthApp } from './root/AuthApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <AuthApp />
        </ChakraProvider>
    </React.StrictMode>,
);
