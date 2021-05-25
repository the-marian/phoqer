import { useRouter } from 'next/router';
import queryString from 'query-string';
import { Range } from 'rc-slider';
import React, { ChangeEvent, KeyboardEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { intNumberValidation } from '../../../../../assets/helpers';
import routes from '../../../../../assets/routes';
import template from '../../../../../assets/template';
import { Theme } from '../../../../../assets/theme';
import useTrans from '../../../../../hooks/trans.hook';
import { ISearch, IState } from '../../../../../interfaces';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        fontSize: theme.rem(1.4),
    },
    wrp: {
        display: 'grid',
        gridTemplateColumns: theme.fr(2),
        gridGap: theme.rem(1),
        marginBottom: theme.rem(2.5),

        ...theme.media(768).max({
            gridGap: '4%',
        }),
    },
    input: {
        ...template(theme).input,
        background: theme.palette.gray[1],
        fontSize: 'inherit',
        color: theme.palette.black[0],
    },
    title: {
        marginBottom: theme.rem(1),
        fontWeight: theme.text.weight[2],
        fontSize: 'inherit',
        color: theme.palette.black[0],
    },
    range: {
        padding: theme.rem(0, 1.2),
    },
}));

const PriceFilter = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();
    const [price, setPrice] = useState<[number, number]>([0, 200_000]);
    const searchParams = useSelector<IState, ISearch>(state => state.config.searchParams);

    useEffect(() => {
        setPrice([searchParams.min_price || 0, searchParams.max_price || 200_000]);
    }, [searchParams.min_price, searchParams.max_price]);

    // manual change
    const handleMin = (event: ChangeEvent<HTMLInputElement>): void => {
        if (intNumberValidation(event.target.value)) return;
        setPrice([+event.target.value, price[1]]);
    };
    const handleMax = (event: ChangeEvent<HTMLInputElement>): void => {
        if (intNumberValidation(event.target.value)) return;
        setPrice([price[0], +event.target.value]);
    };

    // slider change
    const handleRange = (value: number[]): void => {
        setPrice([value[0], value[1]]);
    };

    // submit
    const handleSubmit = (): void => {
        history.push(
            {
                pathname: routes.offers.list,
                query: queryString.stringify(
                    { ...searchParams, max_price: price[1], min_price: price[0], page: 1 },
                    { skipNull: true },
                ),
            },
            undefined,
            { scroll: false },
        );
    };

    // keypress
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.code === 'Enter') handleSubmit();
    };

    return (
        <div className={css.root}>
            <h4 className={css.title}>{trans('price_per_hour') + ' / ' + trans('uah')}</h4>
            <div className={css.wrp}>
                <input
                    className={css.input}
                    type="text"
                    placeholder="min"
                    value={price[0] || ''}
                    onChange={handleMin}
                    onKeyPress={handleKeyPress}
                />
                <input
                    className={css.input}
                    type="text"
                    placeholder="max"
                    value={price[1] || ''}
                    onChange={handleMax}
                    onKeyPress={handleKeyPress}
                />
            </div>

            <div className={css.range}>
                <Range min={0} max={200_000} value={[price[0], price[1]]} onAfterChange={handleSubmit} onChange={handleRange} />
            </div>
        </div>
    );
};

export default PriceFilter;
