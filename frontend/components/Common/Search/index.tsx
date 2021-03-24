import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { ChangeEvent, FormEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../assets/routes';
import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useMedia from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';
import { IDropValue, ISearch, IState } from '../../../interfaces';
import types from '../../../redux/types';
import Button from '../../Layout/Button';
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
        height: theme.rem(6),
        width: '100%',
        paddingLeft: theme.rem(2.5),
        background: theme.palette.gray[1],
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        border: 'none',
        ...template(theme).outline,

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
        color: theme.palette.black[0],
    },
    btn: {
        ...template(theme).btn,
        width: '100%',

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
    reset: {
        fontSize: theme.rem(1.1),
        padding: theme.rem(2),
    },
    resetHidden: {
        opacity: 0,
        visibility: 'hidden',
    },
}));

const Search = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();
    const history = useRouter();
    const dispatch = useDispatch();
    const desktop = useMedia(1100);

    const search = useSelector<IState, ISearch>(state => state.config.search);
    const loading = useSelector<IState, boolean>(state => state.offers.search.loading);

    const handleChange = (value: IDropValue | null): void => {
        dispatch({
            type: types.OFFERS_SEARCH,
            payload: {
                ...search,
                category: value?.type === 'main' ? value?.slug : null,
                sub_category: value?.type === 'sub' ? value?.slug : null,
            },
        });
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch({ type: types.OFFERS_SEARCH, payload: { ...search, search: event.target.value || null } });
    };
    const handleReset = (): void => {
        dispatch({ type: types.OFFERS_SEARCH, payload: { ...search, search: null } });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        history.push(routes.offers.list);
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
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
                        <button type="submit" className={css.icon}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <input
                            value={search.search || ''}
                            onChange={handleInput}
                            className={css.input}
                            type="text"
                            placeholder={T.what_are_you_looking_for}
                        />
                        <button
                            className={clsx(css.reset, !search.search && css.resetHidden)}
                            type="button"
                            onClick={handleReset}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        {desktop && <OptionsDesktop onChange={handleChange} />}
                    </div>
                </div>

                <div className={css.mobile}>
                    {!desktop && <OptionsMobile onChange={handleChange} />}
                    <Button loading={loading} type="submit" className={css.btn}>
                        {T.find}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default Search;
