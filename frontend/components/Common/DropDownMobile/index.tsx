import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import { IDropList } from '../../../interfaces';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        width: '100%',
        background: theme.palette.gray[1],
        border: 'none',
        borderRadius: theme.radius,
        userSelect: 'none',
        outline: 'none',
    },
    transparent: {
        background: 'none',
    },
    white: {
        background: theme.palette.white,
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: theme.rem(2),
        cursor: 'pointer',
        fontSize: theme.rem(1.4),
    },
    box: {
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        maxHeight: theme.rem(60),
        marginTop: theme.rem(1),
        padding: theme.rem(2, 0),
        background: theme.palette.white,
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[3]),
        fontSize: theme.rem(1.4),
        overflowY: 'scroll',
        zIndex: 10,
    },
    item: {
        fontWeight: theme.text.weight[3],
        '& > button': {
            display: 'block',
            width: '100%',
            padding: theme.rem(1, 2),
            textAlign: 'left',

            '&:hover': {
                background: theme.palette.gray[1],
                color: theme.palette.blue[0],
            },
        },
    },
    sub: {
        position: 'relative',
        padding: theme.rem(1, 3),
        fontWeight: theme.text.weight[1],

        '&:hover': {
            background: theme.palette.gray[0],
            color: theme.palette.blue[0],
        },
    },
    icon: {
        marginTop: theme.em(0.4),
        marginRight: theme.rem(1.5),
        fontSize: theme.em(0.7),
    },
}));

interface Props {
    height?: number;
    value: IDropList[];
    defaultValue?: string;
    toRight?: boolean;
    transparent?: boolean;
    white?: boolean;
    onSubmit: (value: string, slug: string, type: 'category' | 'sub_category') => void;
}

const DropDownMobile = ({ height = 6, value, onSubmit, defaultValue, toRight, transparent, white }: Props): ReactElement => {
    const css = useStyles({ height, toRight });

    const [drop, setDrop] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(defaultValue || value[0].name);

    useEffect(() => {
        if (defaultValue) {
            setSelected(defaultValue);
        }
    }, [defaultValue]);

    const handleClick = (): void => {
        setDrop(!drop);
    };

    const handleSelect = (value: string, slug: string, type: 'category' | 'sub_category'): void => {
        setDrop(!drop);
        onSubmit(value, slug, type);
        setSelected(value);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setDrop(false);
        }, 50);
    };

    return (
        <div className={clsx(css.wrp, transparent && css.transparent, white && css.white)} tabIndex={-1} onBlur={handleBlur}>
            <p className={css.inner} style={{ height: height + 'rem' }} onClick={handleClick} aria-hidden>
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
                <div className={css.box}>
                    <ul>
                        {value?.map(({ name, slug, sub }) => (
                            <li className={css.item} key={slug}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleSelect(name, slug, 'category');
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
                                                handleSelect(name, slug, 'sub_category');
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
            )}
        </div>
    );
};

export default DropDownMobile;
