import React, { ReactNode, useEffect } from 'react';

import classNames from 'classnames';
import { Button, Dropdown, EllipsisVerticalIcon, Scrollbars, useOpen } from 'phoqer';

import css from './messages.module.scss';

interface Props {
    scrollRef: Scrollbars | null;
    children: (onClose: () => void) => ReactNode;
}
export const Options = ({ scrollRef, children }: Props): JSX.Element => {
    const { open, onOpen, onToggle, onClose } = useOpen();

    useEffect(() => {
        if (open && scrollRef) {
            scrollRef.container?.children[0]?.addEventListener('scroll', onClose);
        }

        return () => scrollRef?.container?.children[0]?.addEventListener('scroll', onClose);
    }, [open, onClose, scrollRef]);

    return (
        <div className={css.dropdown}>
            <Button onlyIcon className={classNames(css.options, open && css.open)} onClick={onOpen}>
                <EllipsisVerticalIcon />
            </Button>

            <Dropdown open={open} onToggle={onToggle} position="right">
                {children(onClose)}
            </Dropdown>
        </div>
    );
};
