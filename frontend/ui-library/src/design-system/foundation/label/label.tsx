import { ComponentPropsWithoutRef, forwardRef } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation/text';
import { BaseSizes } from 'src/types/sizes.type';
import { labelSizeMap } from 'src/utils/label-size-map';

import css from './label.module.scss';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
    label: string;
    isRequired?: boolean;
    size?: BaseSizes;
}
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({ size = 'md', label, children, className, isRequired = false, ...props }, ref) => {
        return (
            <label ref={ref} {...props} className={classNames(className, css.label)}>
                <Text size={labelSizeMap[size]} weight={500} className={css.text}>
                    {label}
                    {isRequired && <span className={css.asterisk}>*</span>}
                </Text>
                {children}
            </label>
        );
    },
);

Label.displayName = 'Label';
