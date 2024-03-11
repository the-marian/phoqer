import { FC, ReactNode } from 'react';

import classNames from 'classnames';
import { SpinnerIcon } from 'src/design-system/icons';

import css from './tabs.module.scss';

export interface TabItemProps {
    className?: string;
    children: ReactNode;
    isActive?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
}
export const TabItem: FC<TabItemProps> = ({ children, className, isActive = false, isDisabled = false, isLoading = false }) => {
    return (
        <li
            className={classNames(css.li, className, {
                [css.isActive]: isActive,
                [css.isDisabled]: isDisabled,
                [css.isLoading]: isLoading,
            })}
        >
            {isLoading && (
                <div className={css.spinner}>
                    <SpinnerIcon />
                </div>
            )}
            {children}
        </li>
    );
};
