import { ComponentPropsWithoutRef, forwardRef } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation/text';
import { BaseSizes } from 'src/types/sizes.type';
import { labelSizeMap } from 'src/utils/label-size-map';

import css from './error-label.module.scss';

export interface ErrorLabelProps extends ComponentPropsWithoutRef<'small'> {
    isFilled?: boolean;
    size?: BaseSizes;
}
export const ErrorLabel = forwardRef<HTMLElement, ErrorLabelProps>(
    ({ isFilled = false, size = 'md', className, ...props }, ref) => {
        return (
            <div className={classNames(css.root, className, isFilled && css.filled)}>
                <Text ref={ref} as="small" size={labelSizeMap[size]} className={css.label} {...props} />
            </div>
        );
    },
);

ErrorLabel.displayName = 'ErrorLabel';
