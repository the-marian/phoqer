import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation';
import { ChevronRightIcon } from 'src/design-system/icons';

import css from './list.module.scss';

type Props = {
    children: ReactNode;
    icon: ReactNode;
    active?: boolean;
};

export type ListLinkItemProps = ComponentPropsWithoutRef<'a'> & Props;

export const ListLinkItem = forwardRef<HTMLAnchorElement, ListLinkItemProps>(
    ({ children, icon, className, active, ...props }, ref) => {
        return (
            <li>
                <a ref={ref} className={classNames(css.li, className, active && css.active)} {...props}>
                    <div className={css.icon}>{icon}</div>
                    <Text as="div" className={css.children}>
                        {children}
                    </Text>
                    <ChevronRightIcon />
                </a>
            </li>
        );
    },
);

ListLinkItem.displayName = 'ListLinkItem';

export type ListButtonItemProps = ComponentPropsWithoutRef<'button'> & Props;

export const ListButtonItem = forwardRef<HTMLButtonElement, ListButtonItemProps>(
    ({ children, icon, className, active, ...props }, ref) => {
        return (
            <li>
                <button ref={ref} type="button" className={classNames(css.li, className, active && css.active)} {...props}>
                    <div className={css.icon}>{icon}</div>
                    <Text as="div" className={css.children}>
                        {children}
                    </Text>
                </button>
            </li>
        );
    },
);

ListButtonItem.displayName = 'ListButtonItem';

export interface ListProps extends ComponentPropsWithoutRef<'ul'> {
    children: ReactNode;
}
export const List = forwardRef<HTMLUListElement, ListProps>(({ children, ...props }, ref) => {
    return (
        <ul ref={ref} {...props}>
            {children}
        </ul>
    );
});

List.displayName = 'List';
