import { RefObject, useEffect } from 'react';

const makeActive = (element?: HTMLElement): void => {
    if (element) {
        element.setAttribute('data-active', '');
        element.focus();
    }
};

export const useActiveOption = (ref: RefObject<HTMLElement>, isOpen: boolean): void => {
    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (!ref.current) return;

            const elementsList: HTMLElement[] = Array.from(ref.current.querySelectorAll('[data-option]'));
            const activeIndex = elementsList.findIndex(item => item.hasAttribute('data-active'));

            const prevElement = elementsList[activeIndex];
            if (prevElement) {
                prevElement.removeAttribute('data-active');
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault();

                const activeElement = elementsList[activeIndex + 1] ?? elementsList[0];
                makeActive(activeElement);
            }

            if (event.key === 'ArrowUp') {
                event.preventDefault();

                const activeElement = elementsList[activeIndex - 1] ?? elementsList[elementsList.length - 1];
                makeActive(activeElement);
            }
        };

        if (isOpen) {
            const firstElement = ref.current?.querySelector('[data-option]') as HTMLElement;
            makeActive(firstElement);

            document.addEventListener('keydown', handler);
        }

        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [isOpen, ref]);
};
