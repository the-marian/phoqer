import { DetailedHTMLProps, FC, HTMLAttributes, MouseEvent, ReactNode, useEffect, useRef } from 'react';

import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { Backdrop } from '../modals/common';

import css from './drawer.module.scss';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    direction?: 'left' | 'right';
}
export const Drawer: FC<Props> = ({ isOpen, onClose, children, direction = 'left', className, ...props }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
        const isInnerClick = containerRef.current?.contains(event.target as HTMLElement);
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
            window.addEventListener('keydown', handler);
        }

        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    return (
        <CSSTransition in={isOpen} timeout={200} unmountOnExit>
            <Backdrop className={classNames(css.backdrop, css[direction])} onClick={handleBackdropClick}>
                <div ref={containerRef} className={classNames(css.inner, className)} {...props}>
                    {children}
                </div>
            </Backdrop>
        </CSSTransition>
    );
};
