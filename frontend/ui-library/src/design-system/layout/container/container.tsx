import { createElement, forwardRef, ReactHTML, ReactNode, ComponentPropsWithoutRef } from 'react';

import classNames from 'classnames';
import { BaseSizes } from 'src/types/sizes.type';

import css from './container.module.scss';

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
    as?: keyof ReactHTML;
    children: ReactNode;
    size?: BaseSizes;
}

export const Container = forwardRef<HTMLElement, ContainerProps>(({ as = 'div', className, size = 'md', ...props }, ref) => {
    return createElement(as, {
        ...props,
        ref,
        className: classNames(className, css[size], css.root),
    });
});

Container.displayName = 'Container';
