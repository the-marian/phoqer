import React, { ReactElement } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import useConfig from '../../../../../hooks/config.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { IState, PopularSearches } from '../../../../../interfaces';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(2, 0),

        ...theme.media(768).max({
            margin: theme.rem(1, 0),
        }),
    },
    wrp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: theme.rem(1),

        ...theme.media(768).max({
            alignItems: 'center',
        }),
    },
    title: {
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[4],
        color: theme.palette.black[0],
    },
    close: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.rem(2.5),
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],
        '& svg': {
            fontSize: theme.rem(1.2),
            marginRight: theme.rem(1),
        },
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
    hr: {
        border: 'none',
        borderTop: theme.border(0.1, theme.palette.gray[1]),
    },
    list: {
        display: 'grid',
        gridTemplateColumns: theme.fr(3),
        gridGap: theme.rem(1.5, 6),
        maxHeight: theme.rem(100),
        marginTop: theme.rem(3),
        transition: theme.transitions[0],

        '&.enter': {
            maxHeight: 0,
            marginTop: 0,
            opacity: 0,
        },
        '&.enter-done': {
            maxHeight: theme.rem(100),
            marginTop: theme.rem(3),
            opacity: 1,
        },
        '&.exit': {
            maxHeight: 0,
            opacity: 0,
        },

        '& li': {
            width: '100%',
        },

        ...theme.media(850).max({
            gridTemplateColumns: theme.fr(2),
        }),

        ...theme.media(550).max({
            gridTemplateColumns: theme.fr(1),
        }),
    },
    link: {
        width: '100%',
        fontSize: theme.rem(1.4),
        color: theme.palette.black[0],

        ...theme.hover({
            textDecoration: 'underline',
            color: theme.palette.primary[0],
        }),
    },
}));

const TopSearchQuery = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const { locale } = useRouter();
    const [config, setConfig] = useConfig();

    const popularSearches = useSelector<IState, PopularSearches>(state => state.popularSearches);
    const popularSearchesList = popularSearches[locale || 'ua'];

    const handleCloseSearch = () => {
        setConfig({ ...config, hideTopSearchQuery: !config.hideTopSearchQuery });
    };

    return (
        <div className={css.root}>
            <div className={css.wrp}>
                <h2 className={css.title}>{trans('popular_queries')}</h2>
                <button type="button" className={css.close} onClick={handleCloseSearch}>
                    {config.hideTopSearchQuery ? (
                        <>
                            <FontAwesomeIcon icon={faChevronDown} />
                            <span>{trans('show')}</span>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faChevronUp} />
                            <span>{trans('hide')}</span>
                        </>
                    )}
                </button>
            </div>
            <hr className={css.hr} />
            <CSSTransition timeout={200} unmountOnExit in={!config.hideTopSearchQuery}>
                <>
                    {!!popularSearchesList?.length && (
                        <ul className={css.list}>
                            {popularSearchesList.map(query => (
                                <li key={query}>
                                    <Link href={routes.offers.single(`?search=${query}`)}>
                                        <a className={css.link}>{query}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            </CSSTransition>
        </div>
    );
};

export default TopSearchQuery;
