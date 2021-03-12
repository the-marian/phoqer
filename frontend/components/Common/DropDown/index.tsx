import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useMedia from '../../../hooks/media.hook';
import { IDropList, IDropValue } from '../../../interfaces';
import { modal } from '../Modal';
import SmallModalWrp from '../Modal/SmallModalWrp';
import ValuesList from './ValuesList';

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
        color: theme.palette.black[0],
        cursor: 'pointer',
        ...template(theme).outline,

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
        zIndex: 10,
        width: '100%',
        minWidth: theme.rem(20),
        paddingTop: theme.rem(1),
        scrollBehavior: 'smooth',
        '-webkit-overflow-scrolling': 'touch',

        '@media (max-width: 768px)': {
            minWidth: theme.rem(35),
        },
    },
    top: {
        top: 'unset',
        bottom: '120%',
    },
    box: {
        maxHeight: theme.rem(40),
        padding: theme.rem(0.4, 0),
        background: theme.palette.white,
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[3]),
        overflowY: 'auto',

        '@media (max-width: 768px)': {
            maxHeight: theme.rem(35),
            padding: theme.rem(3, 0),
            fontSize: theme.rem(1.6),
        },
    },
    item: {
        cursor: 'pointer',
        borderBottom: theme.border(0.1, theme.palette.gray[1]),

        '&:nth-last-of-type(1)': {
            borderBottom: 'none',
        },

        '& > button': {
            display: 'block',
            width: '100%',
            padding: theme.rem(1),
            textAlign: 'left',
            background: theme.palette.white,
            color: theme.palette.black[0],
            fontSize: theme.rem(1.4),

            '@media (max-width: 768px)': {
                fontSize: theme.rem(1.6),
            },

            '&:hover': {
                background: theme.palette.primary[0],
                color: theme.palette.trueWhite,
            },
        },
    },
    itemEmpty: {
        '& > button': {
            background: theme.palette.white,
        },
    },
    sub: {
        position: 'relative',
        padding: theme.rem(1, 3, 1, 5),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.6),
        },

        '&:hover': {
            background: theme.palette.primary[0],
            color: theme.palette.white,
        },
    },
    white: {
        background: theme.palette.trueWhite,
        color: '#242424',
        boxShadow: theme.shadow[1],
        ...template(theme).outline,
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
    toLeft?: boolean;
    closeOnScroll?: boolean;
    onChange: (value: IDropValue | null) => void;
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
    closeOnScroll = false,
    toLeft = false,
}: Props): ReactElement => {
    const css = useStyles();
    const media = useMedia(768);

    const [top, setTop] = useState<boolean>(false);
    const [drop, setDrop] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(defaultValue?.name || placeholder || data[0].name);

    useEffect(() => {
        if (defaultValue) setSelected(defaultValue.name || placeholder || '');
        if (!defaultValue && placeholder) setSelected(placeholder);
    }, [defaultValue, placeholder]);

    const handleClick = (event: MouseEvent<HTMLParagraphElement>): void => {
        if (media) {
            setTop(document.body.clientHeight / event.currentTarget.getBoundingClientRect().top < 1.6);
            setDrop(!drop);
        } else {
            modal.open(
                <SmallModalWrp>
                    <ValuesList data={data} onSelect={handleSelect} withSub={withSub} css={css} />
                </SmallModalWrp>,
            );
        }
    };

    const handleBlur = (): void => {
        if (!media) return;
        setTimeout(() => {
            setDrop(false);
        }, 150);
    };

    const handleSelect = (name: string, slug: string, type: 'main' | 'sub'): void => {
        onChange({ name, slug, type });
        setSelected(name);
        if (media) setDrop(!drop);
        if (!media) modal.close();
    };

    const handleReset = (event: MouseEvent<HTMLSpanElement>): void => {
        event.stopPropagation();
        onChange(null);
        setSelected(placeholder || '');
        setDrop(false);
    };

    useEffect(() => {
        if (drop && closeOnScroll) {
            const handleClose = (): void => {
                setDrop(false);
            };

            window.addEventListener('scroll', handleClose);
            return () => {
                window.removeEventListener('scroll', handleClose);
            };
        }
    }, [drop, closeOnScroll]);

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
                <span className={css.text}>{selected}</span>
                {placeholder && selected !== placeholder && (
                    <span className={css.reset} onClick={handleReset} aria-hidden>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                )}
            </p>

            {drop && media && (
                <div className={clsx(css.container, top && css.top)} style={toLeft ? { right: 0 } : { left: 0 }}>
                    <div className={css.box}>
                        <ValuesList data={data} onSelect={handleSelect} withSub={withSub} css={css} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDown;
