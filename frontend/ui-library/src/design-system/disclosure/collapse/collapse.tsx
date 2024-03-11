import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode, useEffect, useRef } from 'react';

import classNames from 'classnames';

import css from './collapse.module.scss';

const TIMOUT = 200;

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isOpen: boolean;
    children: ReactNode;
}
export const Collapse: FC<Props> = ({ children, isOpen, className, ...props }) => {
    const timoutRef = useRef<NodeJS.Timeout | null>(null);
    const elementRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (elementRef.current) {
            if (isOpen) {
                elementRef.current.style.height = elementRef.current.scrollHeight + 'px';
                timoutRef.current = setTimeout(() => {
                    if (elementRef.current) {
                        elementRef.current.style.height = '';
                        elementRef.current.style.overflow = '';
                    }
                }, TIMOUT);
            } else {
                elementRef.current.style.height = elementRef.current.scrollHeight + 'px';

                setTimeout(() => {
                    if (elementRef.current) {
                        elementRef.current.style.height = '0';
                        elementRef.current.style.overflow = 'hidden';
                    }
                }, 0);
            }
        }

        return () => {
            if (timoutRef.current) clearTimeout(timoutRef.current);
        };
    }, [isOpen]);

    return (
        <div ref={elementRef} style={{ height: 0 }} className={classNames(css.root, isOpen && css.open, className)} {...props}>
            {children}
        </div>
    );
};
