import { createElement, forwardRef, ReactHTML, ComponentPropsWithoutRef } from 'react';

import classNames from 'classnames';
import { MediaProp } from 'src/types/media.type';
import { FontSizes } from 'src/types/sizes.type';
import { getCssClass } from 'src/utils/get-css-class';

type Weight = 500 | 600 | 700;

export interface HeadingProps extends ComponentPropsWithoutRef<'h1'> {
    as?: keyof ReactHTML;
    size?: MediaProp<FontSizes>;
    weight?: MediaProp<Weight>;
}

export const Heading = forwardRef<HTMLElement, HeadingProps>(
    ({ as = 'h2', className, size = 'md', weight = 600, ...props }, ref) => {
        return createElement(as, {
            ...props,
            ref,
            className: classNames(className, getCssClass('heading-size', size), getCssClass('heading-weight', weight), 'heading'),
        });
    },
);

Heading.displayName = 'Heading';
