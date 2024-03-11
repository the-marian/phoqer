import { ComponentPropsWithoutRef, FC, ReactNode, useEffect, useRef } from 'react';

import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { Tooltip } from 'src/design-system/feedback';
import { Text } from 'src/design-system/foundation';
import { EllipsisVerticalIcon } from 'src/design-system/icons';
import { Button, Dropdown } from 'src/design-system/inputs';
import { Image } from 'src/design-system/media';

import css from './table.module.scss';

export interface TableProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactNode;
}
export const Table: FC<TableProps> = ({ children, className, ...props }) => {
    return (
        <div className={classNames(css.table, 'table', className)} {...props} tabIndex={0}>
            {children}
        </div>
    );
};

export const TBody: FC<TableProps> = ({ children, className, ...props }) => {
    return (
        <div className={classNames(css.tbody, 'tbody', className)} {...props}>
            {children}
        </div>
    );
};

export const THead: FC<TableProps> = ({ children, className, ...props }) => {
    return (
        <div className={classNames(css.thead, 'thead', className)} {...props}>
            {children}
        </div>
    );
};

export interface TrProps extends TableProps {
    children: ReactNode;
    active?: boolean;
}
export const Tr: FC<TrProps> = ({ children, className, active, ...props }) => {
    return (
        <div className={classNames(css.tr, className, 'tr', active && css.active)} {...props}>
            {children}
        </div>
    );
};

export interface TdProps extends TableProps {
    size?: number;
    tooltip?: boolean;
    overflow?: boolean;
    children: ReactNode;
}
export const Td: FC<TdProps> = ({ children, className, tooltip = false, overflow = false, size = 16, style = {}, ...props }) => {
    const content = overflow ? <div className={css.overflow}>{children}</div> : children;

    return (
        <Text
            as="div"
            size="sm"
            className={classNames(css.td, 'td', className)}
            style={{ width: size + 'rem', ...style }}
            {...props}
        >
            {tooltip ? <Tooltip label={children}>{content}</Tooltip> : content}
        </Text>
    );
};

export interface ThProps extends TableProps {
    size?: number;
    tooltip?: boolean;
    overflow?: boolean;
    children: ReactNode;
}
export const Th: FC<ThProps> = ({ children, className, tooltip = false, overflow = false, size = 16, style = {}, ...props }) => {
    const content = overflow ? <div className={css.overflow}>{children}</div> : children;

    return (
        <Text
            as="div"
            size="xs"
            className={classNames(css.th, 'th', css[size], className)}
            style={{ width: size + 'rem', ...style }}
            {...props}
        >
            {tooltip ? <Tooltip label={children}>{content}</Tooltip> : content}
        </Text>
    );
};

export interface TImagesProps extends ComponentPropsWithoutRef<'button'> {
    media: string[] | string;
    size?: number;
}

export const TImages: FC<TImagesProps> = ({ media, size = 16, style = {}, className, ...props }) => {
    const isMediaSet = typeof media !== 'string';

    return (
        <button
            type="button"
            className={classNames(css.wrp, 'td', className)}
            style={{ width: size + 'rem', ...style }}
            {...props}
        >
            <Image className={css.image} src={(isMediaSet ? media[0] : media) || '/placeholder.jpeg'} alt="" />
            {isMediaSet && media.length > 1 && <span className={css.imageCount}>{media.length}</span>}
        </button>
    );
};

interface TDropdownProps extends Omit<TableProps, 'onSelect'> {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    children: ReactNode;
    icon?: ReactNode;
    label?: string;
    onSelect?: (value: unknown) => void;
}
export const TDropdown: FC<TDropdownProps> = ({ isOpen, onOpen, onClose, children, className, icon, label, ...props }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && buttonRef.current && dropdownRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const isTop = rect.top / window.innerHeight < 0.7;

            if (isTop) {
                dropdownRef.current.style.top = rect.bottom + 10 + 'px';
            } else {
                dropdownRef.current.style.top = rect.bottom - 40 - dropdownRef.current.offsetHeight + 'px';
            }

            dropdownRef.current.style.left = rect.left + 'px';
        }
    }, [isOpen]);

    useEffect(() => {
        window.addEventListener('scroll', onClose);
        return () => window.removeEventListener('scroll', onClose);
    }, [onClose]);

    return (
        <>
            <Button ref={buttonRef} variant="secondary" size="sm" onClick={onOpen} leftIcon={icon || <EllipsisVerticalIcon />}>
                {label && <span>{label}</span>}
            </Button>

            {isOpen &&
                ReactDOM.createPortal(
                    <div ref={dropdownRef} className={classNames(css.dropdown, className, 'white')} {...props}>
                        <Dropdown size="sm" isOpen={isOpen} onClose={onClose} className={css.dropdownInner}>
                            {children}
                        </Dropdown>
                    </div>,
                    document.body,
                )}
        </>
    );
};
