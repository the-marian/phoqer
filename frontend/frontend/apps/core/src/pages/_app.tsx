import React, { FC, useEffect } from 'react';

import { Providers } from '@app/providers';
import { changeRoute } from 'common';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';

const AppLayout: FC<AppProps> = ({ Component, pageProps }) => {
    const { push } = useRouter();

    useEffect(() => {
        const handler: EventListener = (event: Event & { detail?: string }) => {
            if (event.detail) {
                push(event.detail);
            }
        };
        changeRoute.subscribe(handler);
        return () => changeRoute.unsubscribe(handler);
    }, [push]);

    return (
        <Providers cookies={pageProps.cookies}>
            <Component {...pageProps} />
        </Providers>
    );
};

export const getServerSideProps = ({ req }: GetServerSidePropsContext) => {
    return {
        props: {
            cookies: req.headers.cookie ?? '',
        },
    };
};

export default AppLayout;
