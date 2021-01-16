import { useEffect, useState } from 'react';

const useMedia = (width = 768): boolean => {
    if (process.browser) {
        const [media, setMedia] = useState<boolean>(window.innerWidth > width);

        useEffect(() => {
            const handleResize = (): void => {
                setMedia(window.innerWidth > width);
            };

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);
        return media;
    }

    return true;
};

export default useMedia;
