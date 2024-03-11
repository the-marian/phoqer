import { useEffect, useState } from 'react';

export const useMedia = (breakpoint: [number, number] | number): boolean => {
    const [media, setMedia] = useState(() => {
        if (typeof breakpoint === 'number') {
            return window.innerWidth >= breakpoint;
        } else {
            if (breakpoint.length !== 2 || breakpoint[0] > breakpoint[1]) throw new Error('Invalid breakpoint value');

            return window.innerWidth >= breakpoint[0] && window.innerWidth <= breakpoint[1];
        }
    });

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            const { width } = entry.contentRect;
            setMedia(() => {
                if (typeof breakpoint === 'number') {
                    return breakpoint >= width;
                } else {
                    return width >= breakpoint[0] && width <= breakpoint[1];
                }
            });
        });

        observer.observe(document.body);
        return () => observer.unobserve(document.body);
    }, [breakpoint]);

    return media;
};
