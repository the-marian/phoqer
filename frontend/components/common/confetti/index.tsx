import React, { ReactElement, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import ReactDOM from 'react-dom';

import useMedia from '../../../hooks/media.hook';

const ConfettiWrp = (): ReactElement => {
    const media = useMedia(768);

    const [party, setParty] = useState<boolean>(true);
    const [size, setSize] = useState<{ y: number; x: number }>({ y: window.innerHeight, x: window?.innerWidth - 20 });

    useEffect(() => {
        const resize = (): void => setSize({ y: window?.innerHeight, x: window?.innerWidth - 20 });
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    useEffect(() => {
        const time = media ? 3000 : 1000;
        setTimeout(() => {
            setParty(false);
        }, time);
    }, []);

    return ReactDOM.createPortal(
        <Confetti
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 100000, width: '100%', pointerEvents: 'none' }}
            numberOfPieces={party ? 200 : 0}
            gravity={0.3}
            onConfettiComplete={confetti => {
                setParty(false);
                confetti?.reset();
            }}
            width={size.x}
            height={size.y}
        />,
        document.body,
    );
};

export default ConfettiWrp;
