import { FC, ReactNode } from 'react';

import classNames from 'classnames';

import css from './segmented-control-list.module.scss';

export interface SegmentedControlListProps {
    className?: string;
    children: ReactNode;
}
export const SegmentedControlList: FC<SegmentedControlListProps> = ({ children, className }) => {
    return <ul className={classNames(css.list, className)}>{children}</ul>;
};
