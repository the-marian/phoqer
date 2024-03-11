import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export interface IsOpenType {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const useIsOpen = (initial = false): IsOpenType => {
    const [isOpen, setIsOpen] = useState(initial);

    const onOpen = useCallback((): void => setIsOpen(true), []);
    const onClose = useCallback((): void => setIsOpen(false), []);
    const onToggle = useCallback((): void => setIsOpen(prev => !prev), []);

    return { isOpen, onOpen, onClose, onToggle, setIsOpen };
};
