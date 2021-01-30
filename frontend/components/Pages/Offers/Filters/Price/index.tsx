import { Range } from 'rc-slider';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { numberValidation } from '../../../../../assets/helpers';
import { Theme } from '../../../../../assets/theme';
import { IDropList } from '../../../../../interfaces';
import DropDown from '../../../../Common/DropDown';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'grid',
        gridTemplateColumns: theme.fr(3),
        gridGap: theme.rem(1),
        marginBottom: theme.rem(2.5),
    },
    input: {
        ...theme.input,
        background: theme.palette.gray[1],
    },
    title: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.6),
        },
    },
    range: {
        padding: theme.rem(0, 1.2),
    },
}));

const CURRENCY: IDropList[] = [
    { name: 'uah', slug: 'uah' },
    { name: 'usd', slug: 'usd' },
    { name: 'eur', slug: 'eur' },
];

const PriceFilter = (): ReactElement => {
    const css = useStyles();
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(100);

    const handleMin = (event: ChangeEvent<HTMLInputElement>): void => {
        if (numberValidation(event.target.value)) return;
        setMin(+event.target.value);
    };
    const handleMax = (event: ChangeEvent<HTMLInputElement>): void => {
        if (numberValidation(event.target.value)) return;
        setMax(+event.target.value);
    };
    const handleRange = (value: number[]): void => {
        setMin(value[0]);
        setMax(value[1]);
    };

    return (
        <div>
            <h4 className={css.title}>Цена за час</h4>
            <div className={css.wrp}>
                <input className={css.input} type="text" placeholder="min" value={min} onChange={handleMin} />
                <input className={css.input} type="text" placeholder="max" value={max} onChange={handleMax} />
                <DropDown data={CURRENCY} onChange={console.log} />
            </div>

            <div className={css.range}>
                <Range min={0} max={100} value={[min, max]} onChange={handleRange} />
            </div>
        </div>
    );
};

export default PriceFilter;
