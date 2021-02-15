import { faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import { IDropList, IDropValue } from '../../../interfaces';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        width: '100%',
        border: 'none',
        userSelect: 'none',
        outline: 'none',
    },
    transparent: {
        background: 'none !important',
        '&:focus': {
            boxShadow: 'none !important',
        },
        '&:hover': {
            boxShadow: 'none !important',
        },
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: 0,
        padding: theme.rem(1.8),
        background: theme.palette.gray[1],
        borderRadius: theme.radius,
        textAlign: 'left',
        fontSize: theme.rem(1.4),
        cursor: 'pointer',
        ...theme.outline,

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.6),
        },

        '@media (max-width: 450px)': {
            paddingLeft: theme.rem(1.2),
        },
    },
    text: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    reset: {
        position: 'absolute',
        top: '50%',
        right: theme.rem(1),
        transform: 'translateY(-50%)',
        padding: theme.rem(1.4),

        '&:hover': {
            color: theme.palette.primary[0],
        },

        '& svg': {
            width: theme.rem(1.1),
            height: theme.rem(1.1),
        },
    },
    placeholder: {
        color: theme.palette.gray[3],
    },
    container: {
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 10,
        width: '100%',
        minWidth: theme.rem(15),
        paddingTop: theme.rem(1),
    },
    top: {
        top: 'unset',
        bottom: '120%',
    },
    box: {
        maxHeight: theme.rem(40),
        padding: theme.rem(2, 0),
        background: theme.palette.white,
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[3]),
        fontSize: theme.rem(1.4),
        overflowY: 'auto',

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.6),
        },
    },
    item: {
        cursor: 'pointer',
        '& > button': {
            display: 'block',
            width: '100%',
            padding: theme.rem(1, 2),
            textAlign: 'left',
            background: theme.palette.white,

            '&:hover': {
                background: theme.palette.gray[1],
                color: theme.palette.primary[0],
            },
        },
    },
    itemEmpty: {
        '& > button': {
            background: theme.palette.gray[0],
        },
    },
    sub: {
        position: 'relative',
        padding: theme.rem(1, 3),

        '&:hover': {
            background: theme.palette.gray[0],
            color: theme.palette.primary[0],
        },
    },
    white: {
        background: theme.palette.white,
        boxShadow: theme.shadow[1],
        ...theme.outline,
    },
    icon: {
        marginRight: theme.rem(0.6),
        fontSize: theme.em(0.7),

        '& svg': {
            width: theme.rem(1),
            height: theme.rem(1),
        },
    },
}));

interface Props {
    height?: number;
    data: IDropList[];
    defaultValue?: IDropValue | IDropList | null;
    placeholder?: string;
    withSub?: boolean;
    transparent?: boolean;
    white?: boolean;
    onChange: (value: IDropValue) => void;
}

const DropDown = ({
    height = 6,
    data,
    onChange,
    defaultValue,
    placeholder,
    withSub,
    transparent,
    white,
}: Props): ReactElement => {
    const css = useStyles();

    const [drop, setDrop] = useState<boolean>(false);
    const [top, setTop] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(defaultValue?.name || placeholder || data[0].name);

    useEffect(() => {
        if (defaultValue) setSelected(defaultValue.name || placeholder);
        if (!defaultValue && placeholder) setSelected(placeholder);
    }, [defaultValue, placeholder]);

    const handleClick = (event: MouseEvent<HTMLParagraphElement>): void => {
        setTop(document.body.clientHeight / event.currentTarget.getBoundingClientRect().top < 1.6);
        setDrop(!drop);
    };

    const handleBlur = (): void => {
        setTimeout(() => {
            setDrop(false);
        }, 200);
    };

    const handleSelect = (name: string, slug: string, type: 'main' | 'sub'): void => {
        onChange({ name, slug, type });
        setSelected(name);
        setDrop(!drop);
    };

    const handleReset = (event: MouseEvent<HTMLSpanElement>): void => {
        event.stopPropagation();
        onChange({ name: '', slug: '', type: 'main' });
        setSelected(placeholder);
        setDrop(false);
    };

    useEffect(() => {
        const handleClose = (): void => {
            if (!drop) setDrop(false);
        };

        window.addEventListener('scroll', handleClose);
        return () => {
            window.removeEventListener('scroll', handleClose);
        };
    }, []);

    return (
        <div className={css.wrp} tabIndex={-1} onBlur={handleBlur}>
            <p
                className={clsx(
                    css.inner,
                    transparent && css.transparent,
                    white && css.white,
                    placeholder === selected && css.placeholder,
                )}
                style={{ height: height + 'rem' }}
                onClick={handleClick}
                aria-hidden="true"
            >
                {drop ? (
                    <span className={css.icon}>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </span>
                ) : (
                    <span className={css.icon}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                )}
                <span className={css.text}>{selected}</span>
                {placeholder && selected !== placeholder && (
                    <span className={css.reset} onClick={handleReset} aria-hidden>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                )}
            </p>

            {drop && (
                <div className={clsx(css.container, top && css.top)}>
                    <div className={css.box}>
                        <ul>
                            {data?.map(({ name, slug, sub }) => (
                                <li className={clsx(css.item, withSub && css.itemEmpty)} key={slug}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleSelect(name, slug, 'main');
                                        }}
                                    >
                                        {name}
                                    </button>

                                    <ul>
                                        {sub?.map(({ name, slug }) => (
                                            <li
                                                key={slug}
                                                className={css.sub}
                                                onClick={() => {
                                                    handleSelect(name, slug, 'sub');
                                                }}
                                                aria-hidden="true"
                                            >
                                                <span>{name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDown;
