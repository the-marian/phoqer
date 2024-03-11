import { FC, ReactNode } from 'react';

import classNames from 'classnames';

import css from './segmented-control-item.module.scss';

export interface SegmentedControlItemProps {
    isActive?: boolean;
    isDisabled?: boolean;
    className?: string;
    children: ReactNode;
    lefIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const SegmentedControlItem: FC<SegmentedControlItemProps> = ({
    children,
    lefIcon,
    rightIcon,
    className,
    isActive = false,
    isDisabled = false,
}) => {
    return (
        <li
            className={classNames(css.item, className, {
                [css.isActive]: isActive && !isDisabled,
                [css.isDisabled]: isDisabled,
            })}
        >
            {lefIcon && <div className={css.lefIcon}>{lefIcon}</div>}
            {children}
            {rightIcon && <div className={css.rightIcon}>{rightIcon}</div>}
        </li>
    );
};
