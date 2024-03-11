import { RefObject, useEffect } from 'react';

interface ClickOutsideType {
    isOpen: boolean;
    onClose?: () => void;
    ref: RefObject<HTMLElement>;
}
export const useClickOutside = ({ isOpen, onClose, ref }: ClickOutsideType): void => {
    useEffect(() => {
        const handler = (event: MouseEvent): void => {
            const isInnerClick = ref.current && ref.current.contains(event.target as HTMLElement);
            if (!isInnerClick) {
                onClose?.();
            }
        };

        if (isOpen && onClose) {
            setTimeout(() => {
                document.addEventListener('click', handler);
            }, 200);
        }
        return () => document.removeEventListener('click', handler);
    }, [onClose, isOpen, ref]);
};

interface EscapeType {
    isOpen: boolean;
    onClose?: () => void;
}
export const useEscape = ({ isOpen, onClose }: EscapeType): void => {
    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                event.stopPropagation();
                onClose?.();
            }
        };
        if (isOpen && onClose) {
            document.addEventListener('keydown', handler);
        }
        return () => document.removeEventListener('keydown', handler);
    }, [onClose, isOpen]);
};
