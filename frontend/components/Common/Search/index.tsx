import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import router from '../../../assets/router';
import { Theme } from '../../../assets/theme';
import LinkArrow from '../LinkArrow';
import { Desktop, Mobile } from '../Media';
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
    locationInput: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        padding: theme.rem(2),
        background: 'none',
        border: 'none',
        color: theme.palette.gray[3],

        '&::before': {
            content: '""',
            display: 'block',
            height: theme.rem(3),
            width: theme.rem(0.1),
            marginRight: theme.rem(2),
            background: theme.palette.gray[2],
        },

        '@media (max-width: 900px)': {
            width: '100%',
            height: theme.rem(8),
            margin: theme.rem(4, 0, 2, 0),
            background: theme.palette.gray[1],
            borderRadius: theme.radius,
            textAlign: 'left',
            fontSize: theme.rem(1.4),
        },

        '& span': {
            width: theme.rem(20),
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

            '@media (max-width: 900px)': {
                width: '100%',
            },
        },
    },
    location: {
        width: theme.rem(30),
    },
    map: {
        width: theme.rem(2.4),
    },
    btn: {
        height: theme.rem(7),
        width: theme.rem(30),
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
                    <LinkArrow href={router.root} toLeft>
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

                        <div className={css.location}>
                            <Desktop>
                                <button type="button" className={css.locationInput} onClick={handleRegionModal}>
                                    <img className={css.map} src="/emoji/map.png" alt="" />
                                    <span>Киев, Киевская область Киев, Киевская область Киев, Киевская область</span>
                                </button>
                            </Desktop>
                        </div>
                    </div>

                    <Mobile>
                        <button type="button" className={css.locationInput} onClick={handleRegionModal}>
                            <img className={css.map} src="/emoji/map.png" alt="" />
                            <span>
                                Киев, Киевская область Киев, Киевская область Киев, Киевская область Киевская область Киев,
                                Киевская область
                            </span>
                        </button>
                    </Mobile>
                </form>

                <button type="submit" className={css.btn}>
                    Найти
                </button>
            </div>
        </>
    );
};

export default Search;
