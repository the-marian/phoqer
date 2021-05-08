import clsx from 'clsx';
import React, { ReactElement } from 'react';

import useTrans from '../../../../hooks/trans.hook';
import { IDropList } from '../../../../interfaces';

interface ValueItemProps {
    css: { [key: string]: string };
    withSub?: boolean;
    slug: string;
    name: string;
    onSelect: (name: string, slug: string, type: 'main' | 'sub') => void;
    type?: 'main' | 'sub';
    sub?: IDropList[];
}
const ValueItem = ({ css, withSub, sub, slug, name, onSelect, type = 'main' }: ValueItemProps) => {
    const trans = useTrans();

    const handleClick = (): void => {
        onSelect(name || trans(slug), slug, type);
    };

    return (
        <li className={type === 'main' ? clsx(css.item, withSub && css.itemEmpty) : css.sub} key={slug}>
            <button type="button" onClick={handleClick}>
                {name || trans(slug)}
            </button>

            {sub?.length ? (
                <ul>
                    {sub?.map(({ name, slug }) => (
                        <ValueItem key={slug} name={name || trans(slug)} slug={slug} type="sub" onSelect={onSelect} css={css} />
                    ))}
                </ul>
            ) : null}
        </li>
    );
};

interface ValuesListProps {
    css: { [key: string]: string };
    data: IDropList[];
    withSub?: boolean;
    onSelect: (name: string, slug: string, type: 'main' | 'sub') => void;
}

const ValuesList = ({ data, onSelect, withSub, css }: ValuesListProps): ReactElement => {
    const trans = useTrans();
    return (
        <ul>
            {data?.map(({ name, slug, sub }) => (
                <ValueItem
                    key={slug}
                    name={name || trans(slug)}
                    slug={slug}
                    sub={sub}
                    css={css}
                    onSelect={onSelect}
                    withSub={withSub}
                />
            ))}
        </ul>
    );
};

export default ValuesList;
