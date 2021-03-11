import clsx from 'clsx';
import React, { ReactElement } from 'react';

import { IDropList } from '../../../../interfaces';

interface Props {
    css: { [key: string]: string };
    data: IDropList[];
    withSub?: boolean;
    onSelect: (name: string, slug: string, type: 'main' | 'sub') => void;
}

const ValuesList = ({ data, onSelect, withSub, css }: Props): ReactElement => (
    <ul>
        {data?.map(({ name, slug, sub }) => (
            <li className={clsx(css.item, withSub && css.itemEmpty)} key={slug}>
                <button
                    type="button"
                    onClick={() => {
                        onSelect(name, slug, 'main');
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
                                onSelect(name, slug, 'sub');
                            }}
                            aria-hidden
                        >
                            <span>{name}</span>
                        </li>
                    ))}
                </ul>
            </li>
        ))}
    </ul>
);

export default ValuesList;
