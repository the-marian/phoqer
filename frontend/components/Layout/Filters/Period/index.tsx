import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import { IDropList } from '../../../../interfaces';
import DropDown from '../../../Common/DropDown';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],
    },
}));

const FILTERS: IDropList[] = [
    { name: 'Час', slug: 'hour' },
    { name: 'День', slug: 'day' },
    { name: 'Месяц', slug: 'month' },
];

const Period = (): ReactElement => {
    const css = useStyles();
    return (
        <div>
            <h4 className={css.title}>Период аренды</h4>
            <DropDown data={FILTERS} onChange={console.log} />
        </div>
    );
};

export default Period;
