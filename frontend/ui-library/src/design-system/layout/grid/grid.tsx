import { createElement, forwardRef, ReactHTML, ReactNode, ComponentPropsWithoutRef } from 'react';

import classNames from 'classnames';
import { MediaProp } from 'src/types/media.type';
import { getCssClass } from 'src/utils/get-css-class';

type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridProps extends ComponentPropsWithoutRef<'div'> {
    as?: keyof ReactHTML;
    size?: MediaProp<Size>;
    children: ReactNode;
}
export const Grid = forwardRef<HTMLElement, GridProps>(({ as = 'div', size = 1, className, ...props }, ref) => {
    return createElement(as, {
        ...props,
        ref,
        className: classNames('grid', getCssClass('grid', size), className),
    });
});

Grid.displayName = 'Grid';
