import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import { IDropList, IDropValue } from '../../../../interfaces';
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
    { name: 'Активное', slug: 'active' },
    { name: 'Временно не активно', slug: 'inactive' },
    { name: 'На данный момент арендуется', slug: 'in_rent' },
];

interface IProps {
    value: IDropList | IDropValue | null;
    onChange: (value: IDropValue | null) => void;
}

const Status = ({ value, onChange }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div>
            <h4 className={css.title}>Статус</h4>
            <DropDown defaultValue={value} data={FILTERS} onChange={onChange} placeholder="Статус объявления" />
        </div>
    );
};

export default Status;
