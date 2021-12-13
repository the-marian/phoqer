import React, { createContext, ReactNode, useEffect, useState } from 'react';

export const Media = createContext<[media: number, setMedia: ((v: number) => void) | null]>([768, null]);

interface IProps {
    initValue: number;
    children: ReactNode;
}

const MediaProvider = ({ children, initValue = 768 }: IProps): JSX.Element => {
    const [media, setMedia] = useState<number>(initValue);

    useEffect(() => {
        if (process.browser) {
            setMedia(window.innerWidth);

            const handleResize = (): void => {
                setMedia(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return <Media.Provider value={[media, setMedia]}>{children}</Media.Provider>;
};

export default MediaProvider;
