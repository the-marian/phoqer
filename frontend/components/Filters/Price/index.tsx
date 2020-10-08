import { Range } from 'rc-slider';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import { IDropList } from '../../../interfaces';
import { numberValidation } from '../../../utils/helpers';
import DropDown from '../../common/DropDown';

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    display: 'grid',
    gridTemplateColumns: theme.fr(3),
    gridGap: theme.rem(1),
    marginBottom: theme.rem(2.5),
  },
  input: {
    display: 'block',
    width: '100%',
    padding: theme.rem(1, 1.5),
    fontSize: theme.rem(1.6),
    borderRadius: theme.radius,
    border: theme.border(0.1, theme.palette.blue[0]),
    background: theme.palette.blue[2],
  },
  title: {
    marginBottom: theme.rem(1),
    fontSize: theme.rem(1.6),
    fontWeight: theme.text.weight[2],
  },
  range: {
    padding: theme.rem(0, 1.2),
  },
}));

const CURRENCY: IDropList[] = [
  { name: 'грн', slug: 'uah' },
  { name: '$', slug: 'usd' },
  { name: '€', slug: 'eur' },
];

const PriceFilter = (): ReactElement => {
  const css = useStyles();
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);

  const handleMin = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!numberValidation(event.target.value)) return;
    setMin(+event.target.value);
  };
  const handleMax = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!numberValidation(event.target.value)) return;
    setMax(+event.target.value);
  };
  const handleRange = (value: number[]): void => {
    setMin(value[0]);
    setMax(value[1]);
  };

  return (
    <div>
      <h4 className={css.title}>Цена</h4>
      <div className={css.wrp}>
        <input
          className={css.input}
          type="text"
          placeholder="min"
          value={min}
          onChange={handleMin}
        />
        <input
          className={css.input}
          type="text"
          placeholder="max"
          value={max}
          onChange={handleMax}
        />
        <DropDown value={CURRENCY} onSubmit={console.log} />
      </div>

      <div className={css.range}>
        <Range min={0} max={100} value={[min, max]} onChange={handleRange} />
      </div>
    </div>
  );
};

export default PriceFilter;
