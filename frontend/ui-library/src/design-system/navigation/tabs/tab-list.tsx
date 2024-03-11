import { FC, ReactNode } from 'react';

import classNames from 'classnames';
import { Scroll } from 'src/design-system/layout';

import css from './tabs.module.scss';

export interface TabListProps {
    className?: string;
    children: ReactNode;
}
export const TabList: FC<TabListProps> = ({ children, className }) => {
    return (
        <Scroll className={classNames(css.wrp, className)}>
            <ul className={css.list}>{children}</ul>
        </Scroll>
    );
};
