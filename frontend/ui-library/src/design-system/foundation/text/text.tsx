import { createElement, forwardRef, ReactHTML, ComponentPropsWithoutRef } from 'react';

import classNames from 'classnames';
import { MediaProp } from 'src/types/media.type';
import { FontSizes } from 'src/types/sizes.type';
import { getCssClass } from 'src/utils/get-css-class';

type Weight = 300 | 400 | 500;
type FontStyle = 'italic' | 'normal';

export interface TextProps extends ComponentPropsWithoutRef<'p'> {
    as?: keyof ReactHTML;
    size?: MediaProp<FontSizes>;
    weight?: MediaProp<Weight>;
    fontStyle?: MediaProp<FontStyle>;
}

export const Text = forwardRef<HTMLElement, TextProps>(
    ({ as = 'p', className, size = 'md', weight = 400, fontStyle = 'normal', ...props }, ref) => {
        return createElement(as, {
            ...props,
            ref,
            className: classNames(
                className,
                'text',
                getCssClass('text-size', size),
                getCssClass('text-weight', weight),
                getCssClass('font-style', fontStyle),
            ),
        });
    },
);

Text.displayName = 'Text';
