import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { memo, ReactElement } from 'react';

import useTrans from '../../../../hooks/trans.hook';
import { IDropList } from '../../../../interfaces';
import icons from '../../../../utils/icons-map';

interface ValueItemProps {
    css: { [key: string]: string };
    withSub?: boolean;
    iconImage?: string;
    slug: string;
    name: string;
    onSelect: (name: string, slug: string, type: 'main' | 'sub') => void;
    type?: 'main' | 'sub';
    sub?: IDropList[];
}

const ValueItem = memo(({ css, withSub, iconImage, sub, slug, name, onSelect, type = 'main' }: ValueItemProps) => {
    const trans = useTrans();

    const handleClick = (): void => {
        onSelect(trans(name || slug), slug, type);
    };

    return (
        <li className={type === 'main' ? clsx(css.item, withSub && css.itemEmpty) : css.sub} key={slug}>
            <button type="button" onClick={handleClick}>
                {iconImage && icons[iconImage] && <FontAwesomeIcon icon={icons[iconImage]} />}
                <span className={iconImage && icons[iconImage] && css.iconImageText}>{trans(name || slug)}</span>
            </button>

            {sub?.length ? (
                <ul>
                    {sub?.map(({ name, slug, icon_image }) => (
                        <ValueItem
                            key={slug}
                            name={trans(name || slug)}
                            iconImage={icon_image}
                            onSelect={onSelect}
                            slug={slug}
                            type="sub"
                            css={css}
                        />
                    ))}
                </ul>
            ) : null}
        </li>
    );
});

ValueItem.displayName = 'ValueItem';

interface ValuesListProps {
    css: { [key: string]: string };
    data: IDropList[];
    withSub?: boolean;
    onSelect: (name: string, slug: string, type: 'main' | 'sub') => void;
}

const ValuesList = ({ data, onSelect, withSub, css }: ValuesListProps): ReactElement => {
    return (
        <ul>
            {data?.map<ReactElement>(({ name, slug, sub, icon_image }) => (
                <ValueItem
                    key={slug}
                    name={name || slug}
                    slug={slug}
                    sub={sub}
                    css={css}
                    onSelect={onSelect}
                    iconImage={icon_image}
                    withSub={withSub}
                />
            ))}
        </ul>
    );
};

export default memo(ValuesList);
