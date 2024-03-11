import { MouseEvent, RefObject, useEffect, useRef } from 'react';

interface UseModalType {
    onBackdropClick: (event: MouseEvent<HTMLDivElement>) => void;
    containerRef: RefObject<HTMLDivElement>;
    mobileRef: RefObject<boolean>;
}
export const useModal = (isOpen: boolean, onClose: () => void): UseModalType => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mobileRef = useRef<boolean>(window.innerWidth < 540);

    const onBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
        const isInnerClick = containerRef.current && containerRef.current.contains(event.target as HTMLElement);
        if (!isInnerClick) {
            onClose();
        }
    };

    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            mobileRef.current = window.innerWidth < 540;

            window.addEventListener('keydown', handler);
        }

        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    return { onBackdropClick, containerRef, mobileRef };
};
