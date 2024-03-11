import { ComponentProps, forwardRef } from 'react';

import classNames from 'classnames';

import css from './skeleton.module.scss';

export interface SkeletonProps extends ComponentProps<'div'> {
    color?: 'light' | 'dark' | 'red' | 'blue' | 'green';
}
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({ className, color = 'light', ...props }, ref) => {
    return <div ref={ref} className={classNames(css.skeleton, css[color], className)} {...props} />;
});

Skeleton.displayName = 'Skeleton';
