import { useEffect } from 'react';

export const useKeyboard = (key: string | string[], callback: () => void): void => {
    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.key === key || key.includes(event.key)) {
                callback();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [callback, key]);
};
