import { createElement, forwardRef, ReactHTML, ReactNode, ComponentPropsWithoutRef } from 'react';

import classNames from 'classnames';
import { MediaProp } from 'src/types/media.type';
import { getCssClass } from 'src/utils/get-css-class';

type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type Align = 'stretch' | 'flex-start' | 'flex-end' | 'center';
type Justify = 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'space-evenly' | 'stretch';
type Wrap = 'wrap' | 'nowrap' | 'wrap-reverse';

export interface FlexProps extends ComponentPropsWithoutRef<'div'> {
    as?: keyof ReactHTML;
    children: ReactNode;
    direction?: MediaProp<Direction>;
    align?: MediaProp<Align>;
    justify?: MediaProp<Justify>;
    wrap?: MediaProp<Wrap>;
}
export const Flex = forwardRef<HTMLElement, FlexProps>(
    ({ as = 'div', className, wrap = 'wrap', direction = 'row', align = 'stretch', justify = 'start', ...props }, ref) => {
        return createElement(as, {
            ...props,
            ref,
            className: classNames(
                'flex',
                className,
                getCssClass('direction', direction),
                getCssClass('align', align),
                getCssClass('justify', justify),
                getCssClass('wrap', wrap),
            ),
        });
    },
);

Flex.displayName = 'Flex';
