import { createElement, forwardRef, ReactHTML, ReactNode, ComponentPropsWithoutRef } from 'react';

import classNames from 'classnames';

export interface GridItemProps extends ComponentPropsWithoutRef<'div'> {
    as?: keyof ReactHTML;
    children?: ReactNode;
}
export const GridItem = forwardRef<HTMLElement, GridItemProps>(({ as = 'div', className, ...props }, ref) => {
    return createElement(as, {
        ...props,
        ref,
        className: classNames('grid-item', className),
    });
});

GridItem.displayName = 'GridItem';
