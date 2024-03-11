import { FC, ReactNode } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation';

import css from './breadcrumb.module.scss';

export interface BreadcrumbProps {
    children: ReactNode;
    isLast?: boolean;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ children, isLast = false }) => {
    return (
        <div className={classNames(css.breadcrumb, isLast && css.isLast)}>
            <Text size="sm">{children}</Text>
            {!isLast && <span className={css.separator}>/</span>}
        </div>
    );
};

export interface BreadcrumbWrpProps {
    children: ReactNode;
}
export const BreadcrumbWrp: FC<BreadcrumbWrpProps> = ({ children }) => <div className={css.wrp}>{children}</div>;
