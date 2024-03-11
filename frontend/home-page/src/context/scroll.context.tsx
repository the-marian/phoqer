import { createContext, useContext, useState, useEffect, FC, PropsWithChildren } from 'react';

import { Router } from 'next/router';
import { Scroll, Scrollbars } from 'phoqer';

type ScrollbarsType = Scrollbars & {
    smoothScroll: (to: number) => void;
};

const ScrollContext = createContext<ScrollbarsType | null>(null);

export const ScrollProvider: FC<PropsWithChildren> = ({ children }) => {
    const [value, setValue] = useState<Scrollbars | null>(null);

    useEffect(() => {
        const scroll = (_: string, params: Record<string, boolean>): void => {
            if (params?.shallow) return;

            value?.scrollTop(0);
        };

        if (value) Router.events.on('routeChangeComplete', scroll);
        return () => Router.events.off('routeChangeComplete', scroll);
    }, [value]);

    const smoothScroll = (top: number): void => {
        if (value?.container?.children?.[0]) {
            value.container.children[0].scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <ScrollContext.Provider value={{ ...value, smoothScroll } as ScrollbarsType}>
            <Scroll ref={ref => setValue(ref)}>{children}</Scroll>
        </ScrollContext.Provider>
    );
};

export const useScrollContext = (): ScrollbarsType | null => {
    return useContext(ScrollContext);
};
