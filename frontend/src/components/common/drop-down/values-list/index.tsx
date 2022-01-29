import React, { memo, ReactElement, useState } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import useTrans from '../../../../hooks/trans.hook';
import { IDropList } from '../../../../interfaces';
import icons from '../../../../utils/icons-map';
import { Theme } from '../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    item: {
        cursor: 'pointer',
        borderBottom: theme.border(0.1, theme.palette.gray[1]),
        '&:nth-last-of-type(1)': {
            borderBottom: 'none',
        },

        '& > button': {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: theme.rem(2),
            textAlign: 'left',
            background: theme.palette.white,
            color: theme.palette.black[0],
            fontSize: theme.rem(1.4),

            '& > svg:nth-of-type(1)': {
                marginBottom: theme.rem(0.2),
                marginRight: theme.rem(1),
                fontSize: theme.rem(1.4),
            },

            '& > svg:nth-of-type(2)': {
                fontSize: theme.rem(1.1),
            },

            '& > *': {
                pointerEvents: 'none',
            },

            ...theme.hover({
                background: theme.palette.primary[0],
                color: theme.palette.trueWhite,
            }),

            ...theme.media(768).max({
                padding: theme.rem(1.5, 1),
                fontSize: theme.rem(1.6),
                ...theme.hover({
                    background: theme.palette.white,
                    color: theme.palette.black[0],
                }),
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
            background: theme.palette.gray[1],
            color: theme.palette.black[0],
            fontSize: theme.rem(1.4),
            textAlign: 'left',
            borderBottom: theme.border(0.1, theme.palette.white),

            ...theme.hover({
                background: theme.palette.primary[0],
                color: theme.palette.trueWhite,
            }),
            ...theme.media(768).max({
                padding: theme.rem(1.5),
                fontSize: theme.rem(1.6),
                ...theme.hover({
                    background: theme.palette.gray[0],
                    color: theme.palette.black[0],
                }),
            }),
        },
    },
    iconImageText: {
        flexGrow: 2,
    },
    list: {
        maxHeight: 0,
        opacity: 0,
        overflow: 'hidden',
        transition: theme.transitions[0],
    },
    open: {
        maxHeight: theme.rem(100),
        opacity: 1,
        overflow: 'unset',
    },
}));

interface ValueItemProps {
    withSub?: boolean;
    iconImage?: string;
    slug: string;
    name: string;
    onSelect: (name: string, slug: string, type: 'main' | 'sub') => void;
    type?: 'main' | 'sub';
    sub?: IDropList[];
    tabIndex?: number;
}

const ValueItem = memo(({ withSub, iconImage, sub, slug, name, onSelect, type = 'main', tabIndex = 0 }: ValueItemProps) => {
    const css = useStyles();
    const trans = useTrans();

    const [open, setOpen] = useState(false);

    const handleClick = (): void => {
        if (sub?.length) {
            setOpen(prev => !prev);
            return;
        }
        onSelect(trans(name || slug), slug, type);
    };

    const mainSelect = (): void => {
        onSelect(trans(name || slug), slug, 'main');
    };

    return (
        <li className={type === 'main' ? clsx(css.item, withSub && css.itemEmpty) : css.sub} key={slug}>
            <button type="button" onClick={handleClick} tabIndex={tabIndex}>
                {iconImage && icons[iconImage] && <FontAwesomeIcon icon={icons[iconImage]} />}
                <span className={clsx(css.iconImageText, iconImage && icons[iconImage])}>{trans(name || slug)}</span>
                {sub?.length && <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />}
            </button>

            {sub?.length ? (
                <ul className={clsx(css.list, open && css.open)}>
                    <ValueItem
                        key={slug}
                        type="sub"
                        slug={slug}
                        onSelect={mainSelect}
                        tabIndex={open ? 1 : -1}
                        name={trans(name || slug)}
                    />
                    {sub?.map(({ name, slug, icon_image }) => (
                        <ValueItem
                            key={slug}
                            slug={slug}
                            type="sub"
                            onSelect={onSelect}
                            iconImage={icon_image}
                            name={trans(name || slug)}
                            tabIndex={open ? 1 : -1}
                        />
                    ))}
                </ul>
            ) : null}
        </li>
    );
});

ValueItem.displayName = 'ValueItem';

interface ValuesListProps {
    data: IDropList[];
    withSub?: boolean;
    onSelect: (name: string, slug: string, type: 'main' | 'sub') => void;
}

const ValuesList = ({ data, onSelect, withSub }: ValuesListProps): ReactElement => {
    return (
        <ul>
            {data?.map<ReactElement>(({ name, slug, sub, icon_image }) => (
                <ValueItem
                    key={slug}
                    name={name || slug}
                    slug={slug}
                    sub={sub}
                    onSelect={onSelect}
                    iconImage={icon_image}
                    withSub={withSub}
                />
            ))}
        </ul>
    );
};

export default memo(ValuesList);
