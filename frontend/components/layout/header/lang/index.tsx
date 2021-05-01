import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import { IDropList } from '../../../../interfaces';
import DropDown from '../../../common/drop-down';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        marginLeft: theme.rem(3),
        borderRadius: theme.radius,

        ...theme.media(768).max({
            marginLeft: '0',
        }),
    },
    lang: {
        '& p': {
            background: theme.palette.primary[0],
            color: theme.palette.trueWhite,
        },
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
        history.push(history.pathname, history.asPath, { locale: value?.slug || 'ru', scroll: false });
    };

    return (
        <div className={css.wrp}>
            <DropDown
                className={css.lang}
                minWidth={15}
                height={3}
                defaultValue={{ name: history.locale?.toUpperCase() || 'EN', slug: history?.locale || 'en', type: 'main' }}
                data={LANGS}
                onChange={handleChange}
                toLeft
                closeOnScroll
            />
        </div>
    );
};

export default Lang;
