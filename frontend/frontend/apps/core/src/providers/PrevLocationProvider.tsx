import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

type PrevLocationContextValue = {
    path: string;
    query: ParsedUrlQuery | null;
};

const defaultValue: PrevLocationContextValue = {
    path: '/',
    query: null,
};

const PrevLocationContext = createContext<PrevLocationContextValue>(defaultValue);

export const PrevLocationProvider: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();

    const ref = useRef<PrevLocationContextValue>(defaultValue);

    useEffect(() => {
        const handler = () => {
            ref.current.path = router.asPath;
            ref.current.query = router.query;
        };

        router.events.on('routeChangeStart', handler);
        return () => {
            router.events.off('routeChangeStart', handler);
        };
    }, [router]);

    return <PrevLocationContext.Provider value={ref.current}>{children}</PrevLocationContext.Provider>;
};

export const usePrevLocation = () => useContext(PrevLocationContext);
