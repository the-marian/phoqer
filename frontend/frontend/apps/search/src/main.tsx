import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { theme } from 'ui';

import { SearchApp } from './root/SearchApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <SearchApp />
        </ChakraProvider>
    </React.StrictMode>,
);
