import React, { ReactElement, useEffect, useState } from 'react';
interface Props {
    size?: number;
    mobile?: boolean;
    children: JSX.Element[] | JSX.Element;
    className?: string;
}

const Media = ({ children, size = 900, mobile = false, className }: Props): ReactElement => {
    const [media, setMedia] = useState<boolean>(
        process.browser ? (mobile ? window.innerWidth < size : window.innerWidth > size) : true,
    );

    useEffect(() => {
        const handleResize = (): void => {
            setMedia(process.browser ? (mobile ? window.innerWidth < size : window.innerWidth > size) : true);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return media && <div className={className}>{children}</div>;
};

export default Media;
