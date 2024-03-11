import { createElement, forwardRef, ReactHTML, ReactNode, ComponentPropsWithoutRef } from 'react';

import classNames from 'classnames';
import { uniqueId } from 'lodash-es';
import { MediaProp } from 'src/types/media.type';
import { useCSSProperty } from 'src/utils/css-property';

export interface RowProps extends ComponentPropsWithoutRef<'div'> {
    as?: keyof ReactHTML;
    children: ReactNode;
    spacing?: MediaProp<number>;
    rowSpacing?: MediaProp<number>;
    columnSpacing?: MediaProp<number>;
}
export const Row = forwardRef<HTMLElement, RowProps>(
    ({ as = 'div', className, spacing, rowSpacing, columnSpacing, ...props }, ref) => {
        const id = uniqueId();

        useCSSProperty(id, '--rowSpacing', spacing);
        useCSSProperty(id, '--columnSpacing', spacing);

        useCSSProperty(id, '--rowSpacing', rowSpacing);
        useCSSProperty(id, '--columnSpacing', columnSpacing);

        return createElement(as, {
            ...props,
            ref,
            id,
            className: classNames('row', className),
        });
    },
);

Row.displayName = 'Row';
