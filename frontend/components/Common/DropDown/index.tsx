import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ReactElement, useEffect, useState } from 'react';
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
        background: 'none',
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: theme.rem(2),
        background: theme.palette.gray[1],
        borderRadius: theme.radius,
        cursor: 'pointer',
        fontSize: theme.rem(1.4),
    },
    container: {
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 10,
        width: '100%',
        paddingTop: theme.rem(1),
    },
    box: {
        maxHeight: theme.rem(40),
        padding: theme.rem(2, 0),
        background: theme.palette.white,
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[3]),
        fontSize: theme.rem(1.4),
        overflowY: 'auto',
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
                color: theme.palette.blue[0],
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
            color: theme.palette.blue[0],
        },
    },
    white: {
        background: theme.palette.white,
    },
    icon: {
        marginTop: theme.em(0.4),
        marginRight: theme.rem(1.5),
        fontSize: theme.em(0.7),
    },
}));

interface Props {
    height?: number;
    data: IDropList[];
    defaultValue?: IDropValue | null;
    withSub?: boolean;
    transparent?: boolean;
    white?: boolean;
    onChange: (value: IDropValue) => void;
}

const DropDown = ({ height = 6, data, onChange, defaultValue, withSub, transparent, white }: Props): ReactElement => {
    const css = useStyles();

    const [drop, setDrop] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(defaultValue?.name || data[0].name);

    useEffect(() => {
        if (defaultValue) {
            setSelected(defaultValue.name);
        }
    }, [defaultValue]);

    const handleClick = (): void => {
        setDrop(!drop);
    };

    const handleBlur = (): void => {
        setTimeout(() => {
            setDrop(false);
        }, 200);
    };

    const handleOpen = (): void => {
        setDrop(true);
    };

    const handleClose = () => {
        setDrop(false);
    };

    const handleSelect = (name: string, slug: string, type: 'main' | 'sub'): void => {
        setDrop(!drop);
        onChange({ name, slug, type });
        setSelected(name);
    };

    return (
        <div className={css.wrp} tabIndex={-1} onMouseLeave={handleClose} onMouseEnter={handleOpen} onBlur={handleBlur}>
            <p
                className={clsx(css.inner, transparent && css.transparent, white && css.white)}
                style={{ height: height + 'rem' }}
                onClick={handleClick}
                aria-hidden
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
                <span>{selected}</span>
            </p>

            {drop && (
                <div className={css.container}>
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
                                                className={css.sub}
                                                key={slug}
                                                aria-hidden
                                                onClick={() => {
                                                    handleSelect(name, slug, 'sub');
                                                }}
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
