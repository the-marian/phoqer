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
import Container from '../../layout/container';
import Button from '../button';
import LinkArrow from '../link-arrow';
import OptionsDesktop from './options-desktop';
import OptionsMobile from './options-mobile';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        padding: theme.rem(12, 0, 4),
        background: theme.palette.gray[0],

        ...theme.media(768).max({
            padding: theme.rem(8, 0, 4),
        }),
    },
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        ...theme.media(1100).max({
            display: 'block',
        }),
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

        ...theme.media(1100).max({
            height: theme.rem(5),
            paddingLeft: theme.rem(1.5),
        }),
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
        height: theme.rem(6),

        ...theme.media(1100).max({
            width: '33%',
            height: theme.rem(5),
        }),
        ...theme.media(550).max({
            width: '100%',
            margin: theme.rem(2, 0, 0),
        }),
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
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
    mobile: {
        width: theme.rem(30),
        marginLeft: theme.rem(2),

        ...theme.media(1100).max({
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            margin: theme.rem(1, 0, 0),
        }),
        ...theme.media(550).max({
            flexDirection: 'column',
        }),
    },
    reset: {
        fontSize: theme.rem(1.1),
        padding: theme.rem(2),
        color: theme.palette.black[0],
    },
    resetHidden: {
        opacity: 0,
        visibility: 'hidden',
    },
}));

interface IProps {
    shallow?: boolean;
}

const Search = ({ shallow = false }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();
    const dispatch = useDispatch();
    const desktop = useMedia(1100);

    const searchParams = useSelector<IState, ISearch>(state => state.config.searchParams);
    const pagination = useSelector<IState, boolean>(state => state.offers.search.pagination);

    const handleChange = (value: IDropValue | null): void => {
        if (shallow) {
            history.push({
                pathname: routes.offers.list,
                query: queryString.stringify(
                    {
                        page: 1,
                        ...searchParams,
                        category: value?.type === 'main' ? value?.slug : null,
                        sub_category: value?.type === 'sub' ? value?.slug : null,
                    },
                    { skipNull: true },
                ),
            });

            return;
        }

        dispatch({
            type: types.OFFERS_SEARCH_LOCAL_PARAMS,
            payload: {
                ...searchParams,
                category: value?.type === 'main' ? value?.slug : null,
                sub_category: value?.type === 'sub' ? value?.slug : null,
            },
        });
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch({ type: types.OFFERS_SEARCH_LOCAL_PARAMS, payload: { ...searchParams, search: event.target.value || null } });
    };
    const handleReset = (): void => {
        if (shallow) {
            history.push(
                {
                    pathname: routes.offers.list,
                    query: queryString.stringify(
                        {
                            page: 1,
                            ...searchParams,
                            search: null,
                        },
                        { skipNull: true },
                    ),
                },
                undefined,
                { scroll: false },
            );

            return;
        }
        dispatch({ type: types.OFFERS_SEARCH_LOCAL_PARAMS, payload: { ...searchParams, search: null } });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (shallow) dispatch({ type: types.SEARCH_OFFERS_START, payload: searchParams });
        history.push(
            {
                pathname: routes.offers.list,
                query: queryString.stringify({ ...searchParams, page: 1 }, { skipNull: true }),
            },
            undefined,
            { shallow },
        );
    };

    return (
        <div className={css.root}>
            <Container>
                <form action="#" method="post" onSubmit={handleSubmit}>
                    {history.pathname !== routes.root && (
                        <div className={css.toHome}>
                            <LinkArrow href={routes.root} toLeft>
                                {trans('to_home')}
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
                                    value={searchParams.search || ''}
                                    onChange={handleInput}
                                    className={css.input}
                                    type="text"
                                    placeholder={trans('what_are_you_looking_for')}
                                />
                                <button
                                    className={clsx(css.reset, !searchParams.search && css.resetHidden)}
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
                            <Button loading={pagination} type="submit" className={css.btn}>
                                {trans('find')}
                            </Button>
                        </div>
                    </div>
                </form>
            </Container>
        </div>
    );
};

export default Search;
