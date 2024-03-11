import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useIsOpen } from 'src/hooks';

import css from './overflow.module.scss';

const BTN_HEIGHT = 40;

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    locale?: Record<'more' | 'less', string>;
    children: ReactNode;
}
export const Overflow: FC<Props> = ({ children, className, locale = { more: 'More', less: 'Less' }, ...props }) => {
    const [isOverflow, setIsOverflow] = useState(true);
    const { isOpen, onToggle } = useIsOpen();

    const rootRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (rootRef.current && innerRef.current) {
            if (isOpen) {
                rootRef.current.style.maxHeight = innerRef.current.scrollHeight + BTN_HEIGHT + 'px';
            } else {
                rootRef.current.style.maxHeight = '';
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (!rootRef.current || !innerRef.current) return;

        if (rootRef.current.scrollHeight - innerRef.current.scrollHeight > 0) {
            setIsOverflow(false);
        }
    }, []);

    return (
        <div ref={rootRef} className={classNames(css.root, isOpen && css.open, className)} {...props}>
            <div ref={innerRef} className={classNames(css.inner, isOverflow && css.isOverflow)}>
                {children}
            </div>

            {isOverflow && (
                <button type="button" onClick={onToggle} className={css.btn}>
                    <span>{isOpen ? locale.less : locale.more}</span>
                </button>
            )}
        </div>
    );
};
