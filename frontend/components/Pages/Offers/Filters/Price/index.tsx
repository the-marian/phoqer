import { Range } from 'rc-slider';
import React, { ChangeEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { numberValidation } from '../../../../../assets/helpers';
import template from '../../../../../assets/template';
import { Theme } from '../../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        fontSize: theme.rem(1.4),

        ...theme.media(768).max({
            fontSize: theme.rem(1.6),
        }),
    },
    wrp: {
        display: 'grid',
        gridTemplateColumns: theme.fr(2),
        gridGap: theme.rem(1),
        marginBottom: theme.rem(2.5),
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

interface IProps {
    data: [number, number];
    initValue: [number, number];
    onChange: (value: [number, number]) => void;
}

const PriceFilter = ({ data, initValue, onChange }: IProps): ReactElement => {
    const css = useStyles();

    const handleMin = (event: ChangeEvent<HTMLInputElement>): void => {
        if (numberValidation(event.target.value)) return;
        onChange([+event.target.value, data[1]]);
    };
    const handleMax = (event: ChangeEvent<HTMLInputElement>): void => {
        if (numberValidation(event.target.value)) return;
        onChange([data[0], +event.target.value]);
    };
    const handleRange = (value: number[]): void => {
        onChange([value[0], value[1]]);
    };

    return (
        <div className={css.root}>
            <h4 className={css.title}>Цена за час / грн</h4>
            <div className={css.wrp}>
                <input className={css.input} type="text" placeholder="min" value={data[0]} onChange={handleMin} />
                <input className={css.input} type="text" placeholder="max" value={data[1]} onChange={handleMax} />
            </div>

            <div className={css.range}>
                <Range min={initValue[0]} max={initValue[1]} value={[data[0], data[1]]} onChange={handleRange} />
            </div>
        </div>
    );
};

export default PriceFilter;
