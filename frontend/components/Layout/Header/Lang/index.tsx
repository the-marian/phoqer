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
        name: 'UA',
        slug: 'ua',
    },
];

const Lang = (): ReactElement => <DropDown height={3} data={LANGS} onChange={console.log} />;

export default Lang;
