import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import useMedia from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';
import LinkArrow from '../../Layout/LinkArrow';
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
        ...theme.outline,

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.6),
        },
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
        ...theme.outline,

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
        color: theme.palette.primary[0],

        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),
        },
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
    const T = useTrans();
    const mobile = useMedia(1100);
    const history = useRouter();

    return (
        <form action="#" method="post">
            {history.pathname !== routes.root && (
                <div className={css.toHome}>
                    <LinkArrow href={routes.root} toLeft>
                        {T.to_home}
                    </LinkArrow>
                </div>
            )}

            <div className={css.wrp}>
                <div className={css.form}>
                    <div className={css.search}>
                        <span className={css.icon}>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input className={css.input} type="text" placeholder={T.what_are_you_looking_for} />
                        {mobile && <OptionsDesktop />}
                    </div>
                </div>

                <div className={css.mobile}>
                    {!mobile && <OptionsMobile />}
                    <button type="submit" className={css.btn}>
                        {T.find}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Search;
