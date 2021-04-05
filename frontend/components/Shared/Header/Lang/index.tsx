import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import { IDropList } from '../../../../interfaces';
import DropDown from '../../../Common/DropDown';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        marginLeft: theme.rem(3),

        ...theme.media(768).max({
            marginLeft: '0',
            borderRadius: theme.radius,
            border: theme.border(0.1, theme.palette.primary[0]),
        }),
    },
}));

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
    const css = useStyles();
    const history = useRouter();
    const handleChange = (value: IDropList | null): void => {
        history.push(history.pathname, history.asPath, { locale: value?.slug || 'ru' });
    };

    return (
        <div className={css.wrp}>
            <DropDown
                height={3}
                defaultValue={{ name: history.locale?.toUpperCase() || 'EN', slug: history?.locale || 'en', type: 'main' }}
                data={LANGS}
                onChange={handleChange}
                white
                toLeft
                closeOnScroll
            />
        </div>
    );
};

export default Lang;
