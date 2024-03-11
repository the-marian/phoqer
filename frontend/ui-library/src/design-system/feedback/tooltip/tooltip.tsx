import { cloneElement, isValidElement, FC, ReactNode, useEffect, useRef } from 'react';

import classNames from 'classnames';
import { uniqueId } from 'lodash-es';

import css from './tooltip.module.scss';

export type PositionClassNames = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    className?: string;
    disabled?: boolean;
    children: ReactNode;
    label: ReactNode;
    position?: PositionClassNames;
}

export const Tooltip: FC<TooltipProps> = ({ children, label, className, disabled = false, position = 'top' }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const id = uniqueId();
    const isValidChildren = isValidElement(children);

    useEffect(() => {
        if (isValidChildren) {
            const element = document.querySelector(`[data-tooltip="${id}"]`);

            const mouseenter = (event: Event): void => {
                if (ref.current && event.currentTarget) {
                    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
                    ref.current.style.display = 'block';

                    switch (position) {
                        case 'top': {
                            ref.current.style.top = rect.top - 10 + 'px';
                            ref.current.style.left = rect.left + rect.width / 2 + 'px';
                            break;
                        }

                        case 'bottom': {
                            ref.current.style.top = rect.bottom + 10 + 'px';
                            ref.current.style.left = rect.left + rect.width / 2 + 'px';
                            break;
                        }

                        case 'right': {
                            ref.current.style.top = rect.top + rect.height / 2 + 'px';
                            ref.current.style.left = rect.right + 10 + 'px';
                            break;
                        }

                        case 'left': {
                            ref.current.style.top = rect.top + rect.height / 2 + 'px';
                            ref.current.style.left = rect.left - 10 + 'px';
                            break;
                        }
                    }
                }
            };

            const mouseleave = (): void => {
                if (ref.current) {
                    ref.current.style.display = '';
                    ref.current.style.top = '';
                    ref.current.style.left = '';
                }
            };

            if (element && !disabled) {
                element.addEventListener('mouseenter', mouseenter);
                element.addEventListener('mouseleave', mouseleave);
                document.addEventListener('click', mouseleave);
                document.addEventListener('scroll', mouseleave);
            }

            return () => {
                if (element) {
                    element.removeEventListener('mouseenter', mouseenter);
                    element.removeEventListener('mouseleave', mouseleave);
                }
                document.addEventListener('click', mouseleave);
                document.addEventListener('scroll', mouseleave);
            };
        }
    }, [disabled, id, isValidChildren, position]);

    if (!isValidChildren) {
        return <>{children}</>;
    }

    const newChildren = cloneElement(children, { 'data-tooltip': id } as Partial<unknown>);

    return (
        <>
            {newChildren}
            {!disabled && (
                <div ref={ref} className={classNames(css.wrp, css[position], className)}>
                    {label}
                </div>
            )}
        </>
    );
};
