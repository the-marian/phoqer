import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';

import useMedia from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';
import { IDropList, IDropValue } from '../../../interfaces';
import mixin from '../../../utils/theming/mixin';
import { Theme } from '../../../utils/theming/theme';
import { modal } from '../modal';
import StickyModal from '../modal/sticky-modal';

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
        ...mixin(theme).outline,
    },
    text: {
        flexGrow: 2,
        ...mixin(theme).cutString,
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
        color: theme.palette.gray[2] + '!important',
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
            pointerEvents: 'none',
        },
    },
    top: {
        top: 'unset',
        bottom: '120%',
    },
    box: {
        position: 'relative',
        maxHeight: theme.rem(55),
        padding: theme.rem(0.8, 0),
        background: theme.palette.white,
        borderRadius: theme.radius,
        overflowY: 'auto',
        ...theme.media(768).max({
            maxHeight: theme.rem(45),
        }),
    },
    '.capitalize': {
        button: {
            display: 'block',
            width: '100%',
            padding: theme.rem(2),
            textAlign: 'left',
            background: theme.palette.white,
            color: theme.palette.black[0],
            fontSize: theme.rem(1.4),
            '&::first-letter': {
                textTransform: 'capitalize',
            },
        },
    },

    white: {
        background: theme.palette.white,
        color: theme.palette.black[0],
        boxShadow: theme.palette.shadowBorder,
        ...mixin(theme).outline,
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
    capitalize?: boolean;
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
    height = 4,
    transparent,
    placeholder,
    defaultValue,
    minWidth = 30,
    toLeft = false,
    capitalize = true,
    closeOnScroll = false,
}: Props): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(768);
    const ref = useRef<HTMLDivElement>(null);

    const [top, setTop] = useState<boolean>(false);
    const [drop, setDrop] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(
        defaultValue?.name || defaultValue?.slug || placeholder || data[0].name || data[0].slug,
    );

    useEffect(() => {
        if (defaultValue) setSelected(defaultValue.name || defaultValue?.slug || placeholder || '');
        if (!defaultValue && placeholder) setSelected(placeholder);
    }, [defaultValue, placeholder]);

    const handleClick = (event: React.MouseEvent<HTMLParagraphElement>): void => {
        event.stopPropagation();
        if (media) {
            setTop(document.body.clientHeight / event.currentTarget.getBoundingClientRect().top < 1.6);
            setDrop(!drop);
        } else {
            modal.open(
                <StickyModal>
                    <ValuesList data={data} onSelect={handleSelect} withSub={withSub} />
                </StickyModal>,
            );
        }
    };

    const handleSelect = (name: string, slug: string, type: 'main' | 'sub'): void => {
        onChange({ name, slug, type });
        setSelected(name);
        media ? setDrop(!drop) : modal.close();
    };

    const handleReset = (event: React.MouseEvent<HTMLSpanElement>): void => {
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

    useEffect(() => {
        if (drop && ref.current) {
            const handler = (event: MouseEvent & { path?: Element[] }): void => {
                if (!event.path?.includes(ref.current as Element)) {
                    setDrop(false);
                }
            };
            document.body.addEventListener('click', handler);
            return () => {
                document.body.removeEventListener('click', handler);
            };
        }
    }, [drop]);

    return (
        <div ref={ref} className={clsx(css.wrp, className)}>
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
                    className={clsx(css.container, top && css.top, capitalize && 'capitalize')}
                    style={toLeft ? { right: 0, minWidth: minWidth + 'rem' } : { left: 0, minWidth: minWidth + 'rem' }}
                >
                    <div className={clsx(css.box, 'box')}>
                        <ValuesList data={data} onSelect={handleSelect} withSub={withSub} />
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default DropDown;
