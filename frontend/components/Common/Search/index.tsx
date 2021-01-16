import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import router from '../../../assets/router';
import { Theme } from '../../../assets/theme';
import LinkArrow from '../LinkArrow';
import OptionsDesktop from './OptionsDesktop';
import OptionsMobile from './OptionsMobile';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        '@media (max-width: 1100px)': {
            display: 'block',
        },
    },
    form: {
        width: '100%',
    },
    search: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: theme.rem(7),
        width: '100%',
        paddingLeft: theme.rem(2.5),
        background: theme.palette.gray[1],
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        border: 'none',
    },
    input: {
        display: 'block',
        flexGrow: 2,
        height: '100%',
        padding: theme.rem(2),
        background: 'none',
        border: 'none',
    },
    btn: {
        height: theme.rem(7),
        width: '100%',
        background: theme.palette.primary[0],
        fontSize: theme.rem(1.6),
        color: theme.palette.white,
        borderRadius: theme.radius,

        '@media (max-width: 1100px)': {
            width: '31%',
        },

        '@media (max-width: 550px)': {
            width: '100%',
            margin: theme.rem(2, 0),
        },
    },
    icon: {
        fontSize: theme.rem(1.4),
    },
    toHome: {
        marginBottom: theme.rem(2),
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[3],
        color: theme.palette.primary[0],
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    mobile: {
        width: theme.rem(30),
        marginLeft: theme.rem(2),

        '@media (max-width: 1100px)': {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            margin: theme.rem(3, 0),
        },

        '@media (max-width: 550px)': {
            margin: theme.rem(2, 0),
            flexDirection: 'column',
        },
    },
}));

const Search = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();

    return (
        <form action="#" method="post">
            {history.pathname !== router.root && (
                <div className={css.toHome}>
                    <LinkArrow href={router.root} toLeft>
                        На главную
                    </LinkArrow>
                </div>
            )}

            <div className={css.wrp}>
                <div className={css.form}>
                    <div className={css.search}>
                        <span className={css.icon}>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input defaultValue={history?.query?.q} className={css.input} type="text" placeholder="Что вы ищите?" />
                        <OptionsDesktop />
                    </div>
                </div>

                <div className={css.mobile}>
                    <OptionsMobile />
                    <button type="submit" className={css.btn}>
                        Найти
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Search;
