import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { IDropList } from '../../../../interfaces';
import DropDown from '../../../Common/DropDown';

const LANGS: IDropList[] = [
    {
        name: 'EN',
        slug: 'en',
    },
    {
        name: 'RU',
        slug: 'ru',
    },
    {
        name: 'PL',
        slug: 'pl',
    },
];

const Lang = (): ReactElement => {
    const history = useRouter();
    const handleChange = (value: { name: string; slug: string; type: string }): void => {
        history.push(history.pathname, history.asPath, { locale: value.slug });
    };

    return (
        <DropDown
            height={3}
            defaultValue={{ name: history.locale.toUpperCase(), slug: history.locale, type: 'main' }}
            data={LANGS}
            onChange={handleChange}
            white
        />
    );
};

export default Lang;
