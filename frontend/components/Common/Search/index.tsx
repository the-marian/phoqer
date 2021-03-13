import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Params } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../assets/routes';
import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useMedia from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';
import { IDropValue, IState } from '../../../interfaces';
import types from '../../../redux/types';
import LinkArrow from '../../Layout/LinkArrow';
import Button from '../Button';
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
        height: theme.rem(6),
        width: '100%',
        background: theme.palette.primary[0],
        fontSize: theme.rem(1.6),
        color: theme.palette.trueWhite,
        borderRadius: theme.radius,
        ...template(theme).outline,

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

interface IValue extends ParsedUrlQueryInput {
    search: string | null;
    category?: string;
    sub_category?: string;
}

interface IProps {
    shallow?: boolean;
}

const Search = ({ shallow = false }: IProps): ReactElement => {
    const T = useTrans();
    const css = useStyles();
    const history = useRouter();
    const dispatch = useDispatch();
    const desktop = useMedia(1100);
    const [query, setQuery] = useState<IValue>({ search: String(history.query.search || '') || null });

    // loading
    const loading = useSelector<IState, boolean>(state => state.offers.search.loading);

    const handleChange = (value: IDropValue | null): void => {
        setQuery({ search: query.search, [value?.type === 'sub' ? 'sub_category' : 'category']: value?.slug || '' });
    };
    const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
        // window.history.replaceState({}, '', routes.offers.single + '?' + queryString.stringify({ search }));
        setQuery({ ...query, search: event.target.value });
    };

    useEffect(() => {
        if (history.query.search !== query.search) setQuery({ search: String(history.query.search || '') || null });
    }, [history.query]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data: Params = {};
        if (query.search?.trim()) data.search = query.search;
        if (query.category) data.category = query.category;
        if (query.sub_category) data.sub_category = query.sub_category;

        history.push({ pathname: routes.offers.list, query: data }, undefined, { shallow });
        if (shallow) {
            dispatch({ type: types.SEARCH_OFFERS_START, payload: data });
            window.scrollTo({ top: document.getElementById('products')?.offsetTop || 0, behavior: 'smooth' });
        }
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
                        <span className={css.icon}>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input
                            value={query.search || ''}
                            onChange={handleInput}
                            className={css.input}
                            type="text"
                            placeholder={T.what_are_you_looking_for}
                        />
                        {desktop && <OptionsDesktop onChange={handleChange} />}
                    </div>
                </div>

                <div className={css.mobile}>
                    {!desktop && <OptionsMobile onChange={handleChange} />}
                    <Button loading={loading && shallow} type="submit" className={css.btn}>
                        {T.find}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default Search;
