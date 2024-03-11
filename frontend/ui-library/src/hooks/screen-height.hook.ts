import { useEffect } from 'react';

export const useScreenHeight = (): void => {
    useEffect(() => {
        const resize = (): void => document.body.style.setProperty('--100vh', window.innerHeight + 'px');
        resize();

        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);
};
