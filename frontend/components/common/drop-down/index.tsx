import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useMedia from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';
import { IDropList, IDropValue } from '../../../interfaces';
import { modal } from '../modal';
import SmallModalWrp from '../modal/small-modal-wrp';
import ValuesList from './values-list';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        width: '100%',
        border: 'none',
        userSelect: 'none',
        outline: 'none',
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        margin: 0,
        padding: theme.rem(1),
        background: theme.palette.gray[1],
        borderRadius: theme.radius,
        textAlign: 'left',
        fontSize: theme.rem(1.4),
        color: theme.palette.black[0],
        cursor: 'pointer',
        ...template(theme).outline,
    },
    text: {
        flexGrow: 2,
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    transparent: {
        background: 'none !important',
        ...theme.focus({
            border: theme.border(0.2, 'transparent'),
        }),
        ...theme.hover({
            border: theme.border(0.2, 'transparent'),
        }),
    },
    icon: {
        marginRight: theme.rem(0.6),
        fontSize: theme.em(0.7),
    },
    reset: {
        padding: theme.rem(1),
        fontSize: theme.rem(1.1),

        ...theme.hover({
            color: theme.palette.primary[0],
        }),
    },
    placeholder: {
        color: theme.palette.gray[3],
    },
    container: {
        position: 'absolute',
        top: '100%',
        zIndex: 10,
        width: '100%',
        marginTop: theme.rem(1),
        scrollBehavior: 'smooth',
        '-webkit-overflow-scrolling': 'touch',
        boxShadow: theme.shadow[4],
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[1]),
        transition: theme.transitions[0],

        ...theme.media(768).max({
            minWidth: theme.rem(30),
        }),
        '&.enter': {
            opacity: 0,
            transform: 'translateY(-2rem)',
        },
        '&.enter-done': {
            opacity: 1,
            transform: 'translateY(0)',
        },
        '&.exit': {
            opacity: 0,
            transform: 'translateY(-2rem)',
        },
    },
    top: {
        top: 'unset',
        bottom: '120%',
    },
    box: {
        position: 'relative',
        maxHeight: theme.rem(45),
        padding: theme.rem(0.8, 0),
        background: theme.palette.white,
        borderRadius: theme.radius,
        overflowY: 'auto',
        ...theme.media(768).max({
            maxHeight: theme.rem(35),
        }),
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
            padding: theme.rem(2),
            textAlign: 'left',
            background: theme.palette.white,
            color: theme.palette.black[0],
            fontSize: theme.rem(1.4),
            '&::first-letter': {
                textTransform: 'uppercase',
            },
            ...theme.hover({
                background: theme.palette.primary[0],
                color: theme.palette.trueWhite,
            }),
            ...theme.media(768).max({
                padding: theme.rem(1.5, 0),
                fontSize: theme.rem(1.6),
            }),
        },
    },
    itemEmpty: {
        '& > button': {
            background: theme.palette.white,
        },
    },
    sub: {
        '& > button': {
            position: 'relative',
            width: '100%',
            padding: theme.rem(2, 2, 2, 4),
            background: theme.palette.gray[0],
            color: theme.palette.black[0],
            fontSize: theme.rem(1.4),
            textAlign: 'left',

            ...theme.media(768).max({
                padding: theme.rem(1.5),
                fontSize: theme.rem(1.6),
            }),
            ...theme.hover({
                background: theme.palette.primary[0],
                color: theme.palette.trueWhite,
            }),
        },
    },
    white: {
        background: theme.palette.trueWhite,
        color: theme.palette.trueBlack,
        boxShadow: theme.shadow[1],
        ...template(theme).outline,
    },
}));

interface Props {
    white?: boolean;
    icon?: IconProp;
    height?: number;
    toLeft?: boolean;
    data: IDropList[];
    withSub?: boolean;
    minWidth?: number;
    className?: string;
    placeholder?: string;
    transparent?: boolean;
    closeOnScroll?: boolean;
    defaultValue?: IDropValue | IDropList | null;
    onChange: (value: IDropValue | null) => void;
}

const DropDown = ({
    icon,
    data,
    white,
    withSub,
    onChange,
    className,
    height = 5,
    transparent,
    placeholder,
    defaultValue,
    minWidth = 30,
    toLeft = false,
    closeOnScroll = false,
}: Props): ReactElement => {
    const css = useStyles();
    const media = useMedia(768);
    const trans = useTrans();

    const [top, setTop] = useState<boolean>(false);
    const [drop, setDrop] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(
        defaultValue?.name || defaultValue?.slug || placeholder || data[0].name || data[0].slug,
    );

    useEffect(() => {
        if (defaultValue) setSelected(defaultValue.name || defaultValue?.slug || placeholder || '');
        if (!defaultValue && placeholder) setSelected(placeholder);
    }, [defaultValue, placeholder]);

    const handleClick = (event: MouseEvent<HTMLParagraphElement>): void => {
        event.stopPropagation();
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
            const handleClose = (): void => setDrop(false);
            window.addEventListener('scroll', handleClose);
            return () => {
                window.removeEventListener('scroll', handleClose);
            };
        }
    }, [drop, closeOnScroll]);

    return (
        <div className={clsx(css.wrp, className)} tabIndex={-1} onBlur={handleBlur}>
            <p
                className={clsx(
                    css.inner,
                    transparent && css.transparent,
                    white && css.white,
                    placeholder === selected && css.placeholder,
                )}
                style={{ height: height + 'rem' }}
                onClick={handleClick}
                aria-hidden={true}
            >
                {icon ? (
                    <FontAwesomeIcon icon={icon} />
                ) : (
                    <>
                        {drop ? (
                            <span className={css.icon}>
                                <FontAwesomeIcon icon={faChevronUp} />
                            </span>
                        ) : (
                            <span className={css.icon}>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        )}
                        <span className={css.text}>{trans(selected)}</span>
                        {placeholder && selected !== placeholder && (
                            <span className={css.reset} onClick={handleReset} aria-hidden={true}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        )}
                    </>
                )}
            </p>

            <CSSTransition timeout={200} unmountOnExit in={drop && media}>
                <div
                    className={clsx(css.container, top && css.top)}
                    style={toLeft ? { right: 0, minWidth: minWidth + 'rem' } : { left: 0, minWidth: minWidth + 'rem' }}
                >
                    <div className={clsx(css.box, 'box')}>
                        <ValuesList data={data} onSelect={handleSelect} withSub={withSub} css={css} />
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default DropDown;
