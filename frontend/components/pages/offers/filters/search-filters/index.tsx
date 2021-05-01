import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import routes from '../../../../../assets/routes';
import template from '../../../../../assets/template';
import { Theme } from '../../../../../assets/theme';
import useConfig from '../../../../../hooks/config.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { ISearch, IState } from '../../../../../interfaces';
import initState from '../../../../../redux/state';
import Checkboxes from '../../../../common/checkbox/checkboxes';
import Period from '../period';
import PriceFilter from '../price';
import Sort from '../sort';
import Status from '../status';

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
    form: {
        margin: theme.rem(2, 0, 4),
        maxHeight: theme.rem(100),
        opacity: 1,
        transition: theme.transitions[0],

        '&.enter': {
            margin: 0,
            maxHeight: 0,
            opacity: 0,
        },
        '&.enter-done': {
            margin: theme.rem(2, 0, 4),
            maxHeight: theme.rem(100),
            opacity: 1,
        },
        '&.exit': {
            maxHeight: 0,
            opacity: 0,
        },
    },
    formInner: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

        '& > div': {
            width: '24%',
        },

        ...theme.media(1100).max({
            '& > div': {
                width: '32%',
                margin: theme.rem(2, 0),
            },
        }),
        ...theme.media(768).max({
            '& > div:nth-of-type(1)': {
                width: '100%',
            },

            '& > div': {
                width: '48%',
                margin: theme.rem(1, 0),
            },
        }),
    },
    btnWrp: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.rem(3),
    },
    reset: {
        ...template(theme).btn,
        marginRight: theme.rem(2),
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,

        '& span': {
            marginLeft: theme.rem(1),
        },

        ...theme.media(500).max({
            width: '100%',
            margin: theme.rem(0, 0, 2),
        }),
    },
    hr: {
        border: 'none',
        borderTop: theme.border(0.1, theme.palette.gray[1]),
    },
}));

interface ICheckbox {
    [key: string]: boolean | null;
}

const SearchFilters = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();
    const [config, setConfig] = useConfig();

    const searchParams = useSelector<IState, ISearch>(state => state.config.searchParams);

    const handleCloseFilters = () => {
        setConfig({ ...config, hideSearchFilters: !config.hideSearchFilters });
    };

    const handleCheckboxes = (value: ICheckbox): void => {
        history.push(
            {
                pathname: routes.offers.list,
                query: queryString.stringify({ ...searchParams, page: 1, ...value }, { skipNull: true }),
            },
            undefined,
            { scroll: false },
        );
    };

    const handleReset = (): void => {
        history.push(
            {
                pathname: routes.offers.list,
                query: queryString.stringify({ ...initState.config.searchParams, page: 1 }, { skipNull: true }),
            },
            undefined,
            { scroll: false },
        );
    };

    return (
        <div className={css.root}>
            <div className={css.wrp}>
                <h2 className={css.title}>{trans('filters')}</h2>
                <button type="button" className={css.close} onClick={handleCloseFilters}>
                    {config.hideSearchFilters ? (
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
            <CSSTransition timeout={200} unmountOnExit in={!config.hideSearchFilters}>
                <div className={css.form}>
                    <div className={css.formInner}>
                        <PriceFilter />
                        <Period />
                        <Sort />
                        <Status />
                    </div>

                    <Checkboxes
                        values={{
                            top: searchParams.top,
                            no_deposit: searchParams.no_deposit,
                            is_deliverable: searchParams.is_deliverable,
                        }}
                        labels={[trans('top_offers_only'), trans('no_deposit'), trans('with_delivery')]}
                        onChange={handleCheckboxes}
                    />

                    <div className={css.btnWrp}>
                        <button className={css.reset} type="button" onClick={handleReset}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            <span>{trans('clear_all_filters')}</span>
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default SearchFilters;
