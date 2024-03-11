import { DetailedHTMLProps, FC, HTMLAttributes, MouseEvent, ReactNode } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation';
import { CloseIcon } from 'src/design-system/icons';
import { IconButton } from 'src/design-system/inputs';

import css from './chips.module.scss';

export interface ChipsProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onClick'> {
    isNew?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}
export const Chips: FC<ChipsProps> = ({ onClick, className, children, isNew = false, ...props }) => {
    return (
        <div className={classNames(css.root, isNew && css.isNew, className)} {...props}>
            <Text as="div" size="xs" className={css.children}>
                {children}
            </Text>
            <IconButton label="Close" size="sm" className={css.close} onClick={onClick} type="button" aria-label="Clear">
                <CloseIcon />
            </IconButton>
        </div>
    );
};
