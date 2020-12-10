import {faChevronDown, faSearch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import LinkArrow from '../LinkArrow';
import { Desktop } from '../Media';
import { modal } from '../Modal';
import RegionModal from '../RegionModal';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        '@media (max-width: 960px)': {
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
        height: theme.rem(6),
        width: '100%',
        paddingLeft: theme.rem(2.5),
        background: theme.palette.gray[1],
        fontSize: theme.rem(1.6),
        borderRadius: theme.radius,
        border: 'none',
    },
    cat: {
        position: 'relative',
        width: theme.rem(35),
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            height: '50%',
            width: theme.rem(0.1),
            background: theme.palette.gray[2],
        },

        '@media (max-width: 1200px)': {
            width: theme.rem(28),
        },
        '@media (max-width: 900px)': {
            height: '100%',
            width: theme.rem(8),
        },
    },
    input: {
        display: 'block',
        width: '100%',
        height: '100%',
        padding: theme.rem(2),
        background: 'none',
        border: 'none',
    },
    btn: {
        height: theme.rem(6),
        width: theme.rem(40),
        marginLeft: theme.rem(2),
        background: theme.palette.blue[0],
        fontSize: theme.rem(1.6),
        color: theme.palette.white,
        borderRadius: theme.radius,

        '@media (max-width: 960px)': {
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
        color: theme.palette.blue[0],
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    mobileCat: {
        marginTop: theme.rem(1),
    },
}));

const Search = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();

    const handleRegionModal = () => {
        modal.open(<RegionModal />);
    };

    return (
        <>
            {history.pathname !== '/' && (
                <div className={css.toHome}>
                    <LinkArrow href="/" toLeft>
                        На главную
                    </LinkArrow>
                </div>
            )}

            <div className={css.wrp}>
                <form className={css.form} action="#" method="post">
                    <div className={css.search}>
                        <span className={css.icon}>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input defaultValue={history?.query?.q} className={css.input} type="text" placeholder="Что вы ищите?" />
                        <Desktop>
                            <button type="button" className={css.input} onClick={handleRegionModal}>
                                <FontAwesomeIcon icon={faChevronDown} />
                                <span>Киев, Киевская область</span>
                            </button>
                        </Desktop>
                    </div>

                    {/*{history.pathname === '/' && (*/}
                    {/*    <Mobile>*/}
                    {/*        <button type="button" className={css.input} onClick={handleRegionModal}>*/}
                    {/*            <FontAwesomeIcon icon={faChevronDown} />*/}
                    {/*            <span>Киев, Киевская область</span>*/}
                    {/*        </button>*/}
                    {/*    </Mobile>*/}
                    {/*)}*/}
                </form>

                <button type="submit" className={css.btn}>
                    Найти
                </button>
            </div>
        </>
    );
};

export default Search;
