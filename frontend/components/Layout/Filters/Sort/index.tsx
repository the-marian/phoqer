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
    { name: 'От новых к старым', slug: 'old' },
    { name: 'От старых к новым', slug: 'new' },
    { name: 'Самые популярные', slug: 'popular' },
    { name: 'От дешевых к дорогим', slug: 'cheap' },
    { name: 'От дорогих к дешевым', slug: 'expensive' },
];

const Sort = (): ReactElement => {
    const css = useStyles();
    return (
        <div>
            <h4 className={css.title}>Cортировать</h4>
            <DropDown data={FILTERS} onChange={console.log} />
        </div>
    );
};

export default Sort;
