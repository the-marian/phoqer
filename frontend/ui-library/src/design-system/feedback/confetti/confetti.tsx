import { FC, useEffect, useState } from 'react';

import ConfettiComponent from 'react-confetti';
import ReactDOM from 'react-dom';

export const Confetti: FC = () => {
    const [party, setParty] = useState<boolean>(true);
    const [size, setSize] = useState<{ y: number; x: number }>({ y: window.innerHeight, x: window?.innerWidth - 20 });

    useEffect(() => {
        const resize = (): void => setSize({ y: window?.innerHeight, x: window?.innerWidth - 20 });

        const observer = new ResizeObserver(resize);
        observer.observe(document.body);
        return () => observer.unobserve(document.body);
    }, []);

    useEffect(() => {
        const id = setTimeout(() => {
            setParty(false);
        }, 3000);

        return () => {
            clearTimeout(id);
        };
    }, []);

    return ReactDOM.createPortal(
        <ConfettiComponent
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
