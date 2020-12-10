import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import { IDropList } from '../../../interfaces';

const SELECTED_LENGTH = 20;

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
        fontSize: theme.rem(1.3),
    },
    box: {
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        maxHeight: theme.rem(40),
        marginTop: theme.rem(1),
        padding: theme.rem(2, 0),
        background: theme.palette.white,
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[3]),
        fontSize: theme.rem(1.3),
        overflowY: 'scroll',
        zIndex: 10,
    },
    sub: {
        position: 'absolute',
        top: '100%',
        width: '100%',
        maxHeight: theme.rem(40),
        marginTop: theme.rem(1),
        zIndex: 10,
    },
    subBox: {
        maxHeight: theme.rem(40),
        padding: theme.rem(2, 0),
        background: theme.palette.white,
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[3]),
        fontSize: theme.rem(1.3),
        overflowY: 'scroll',
    },
    button: {
        display: 'block',
        width: '100%',
        padding: theme.rem(1, 3),
        cursor: 'pointer',
        borderRadius: 0,
        textAlign: 'left',

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

const DropDown = ({ height = 6, value, onSubmit, defaultValue, toRight, white, transparent }: Props): ReactElement => {
    const css = useStyles({ height, toRight });
    const [drop, setDrop] = useState<boolean>(false);
    const [hover, setHover] = useState<number | null>(null);
    const [selected, setSelected] = useState<string>(defaultValue || value[0].name);

    useEffect(() => {
        if (defaultValue) {
            setSelected(defaultValue);
        }
    }, [defaultValue]);

    const handleClick = (): void => {
        setDrop(!drop);
        setHover(null);
    };

    const handleSelect = (value: string, slug: string, type: 'category' | 'sub_category'): void => {
        setDrop(!drop);
        onSubmit(value, slug, type);
        setSelected(value);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setDrop(false);
            setHover(null);
        }, 100);
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
                <span>{selected.length > SELECTED_LENGTH ? `${selected.slice(0, SELECTED_LENGTH - 1)}...` : selected}</span>
            </p>

            {drop && (
                <>
                    <div className={css.box}>
                        <ul>
                            {value?.map(({ name, slug, sub }, index) => (
                                <li key={slug}>
                                    <button
                                        type="button"
                                        className={css.button}
                                        onClick={() => {
                                            handleSelect(name, slug, 'category');
                                        }}
                                        onMouseMove={() => {
                                            setHover(sub ? index : null);
                                        }}
                                    >
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {value &&
                        value?.map(
                            ({ name, sub }, index) =>
                                !!sub?.length && (
                                    <div
                                        key={name}
                                        className={css.sub}
                                        style={{
                                            visibility: hover === index ? 'visible' : 'hidden',
                                            right: toRight ? 'calc(100% + 1rem)' : 'uset',
                                            left: toRight ? 'uset' : 'calc(100% + 1rem)',
                                        }}
                                    >
                                        <div className={css.subBox}>
                                            <ul>
                                                {sub.map(({ name, slug }) => (
                                                    <li key={slug}>
                                                        <button
                                                            className={css.button}
                                                            type="button"
                                                            onClick={() => {
                                                                handleSelect(name, slug, 'sub_category');
                                                            }}
                                                        >
                                                            {name}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ),
                        )}
                </>
            )}
        </div>
    );
};

export default DropDown;
