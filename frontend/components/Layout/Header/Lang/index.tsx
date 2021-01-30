import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import { IDropList } from '../../../../interfaces';
import DropDown from '../../../Common/DropDown';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        marginLeft: theme.rem(3),

        '@media (max-width: 768px)': {
            marginLeft: theme.rem(1),
            borderRadius: theme.radius,
            border: theme.border(0.1, theme.palette.primary[0]),
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
    const handleChange = (value: { name: string; slug: string; type: string }): void => {
        history.push(history.pathname, history.asPath, { locale: value.slug });
    };

    return (
        <div className={css.wrp}>
            <DropDown
                height={3}
                defaultValue={{ name: history.locale.toUpperCase(), slug: history.locale, type: 'main' }}
                data={LANGS}
                onChange={handleChange}
                white
            />
        </div>
    );
};

export default Lang;
