import React, { ReactElement } from 'react';

import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons/faGlobeAmericas';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import { IDropList } from '../../../../interfaces';
import { Theme } from '../../../../utils/theming/theme';
import DropDown from '../../../common/drop-down';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius,
        marginRight: theme.rem(2),

        ...theme.media(768).max({
            marginRight: theme.rem(0.5),
        }),
    },
    text: {
        marginRight: theme.rem(1),
        fontSize: theme.rem(1.2),
        color: theme.palette.black[0],

        ...theme.media(768).max({
            fontSize: '0',
        }),
    },
    lang: {
        '& button': {
            textAlign: 'right',
        },

        '& > button': {
            background: theme.palette.gray[1],
            fontSize: theme.rem(2),
            color: theme.palette.primary[0],

            ...theme.media(768).max({
                background: 'none',
                color: theme.palette.gray[3],
            }),
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
        name: 'UA',
        slug: 'ua',
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
            <p className={css.text}>{history.locale?.toUpperCase() || 'EN'}</p>
            <DropDown
                icon={faGlobeAmericas}
                className={css.lang}
                minWidth={15}
                height={3.5}
                defaultValue={{ name: history.locale?.toUpperCase() || 'EN', slug: history?.locale || 'en', type: 'main' }}
                data={LANGS}
                onChange={handleChange}
                closeOnScroll
                toLeft
            />
        </div>
    );
};

export default Lang;
