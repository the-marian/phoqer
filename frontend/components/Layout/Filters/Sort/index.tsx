import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import { IDropList, IDropValue } from '../../../../interfaces';
import DropDown from '../../../Common/DropDown';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        fontSize: theme.rem(1.4),
        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.6),
        },
    },
    title: {
        marginBottom: theme.rem(1),
        fontSize: 'inherit',
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],
    },
}));

const FILTERS: IDropList[] = [
    { name: 'От новых к старым', slug: 'pud_date' },
    { name: 'От старых к новым', slug: '-pud_date' },
    { name: 'Количество просмотров (по убыванию)', slug: 'views' },
    { name: 'Количество просмотров (по возростанию)', slug: '-views' },
    { name: 'От дешевых к дорогим', slug: 'price' },
    { name: 'От дорогих к дешевым', slug: '-price' },
    { name: 'Сума залога (по убыванию)', slug: '-deposit_val' },
    { name: 'Сума залога (по возростанию)', slug: 'deposit_val' },
];

interface IProps {
    value: IDropList | IDropValue | null;
    onChange: (value: IDropValue | null) => void;
}

const Sort = ({ value, onChange }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.root}>
            <h4 className={css.title}>Cортировать</h4>
            <DropDown defaultValue={value} data={FILTERS} onChange={onChange} placeholder="Укажите тип сортировки" />
        </div>
    );
};

export default Sort;
