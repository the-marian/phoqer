import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import * as helpers from '../../../../../assets/helpers';
import { Theme } from '../../../../../assets/theme';
import { ICategories, IState } from '../../../../../interfaces';
import DropDown from '../../../../Common/DropDown';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.6),
        },
    },
}));

const Categories = (): ReactElement => {
    const css = useStyles();

    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = helpers.formatCatList(data);

    return (
        <>
            {categories?.length ? (
                <div>
                    <h4 className={css.title}>Категория</h4>
                    <DropDown data={categories} onChange={console.log} withSub />
                </div>
            ) : null}
        </>
    );
};

export default Categories;
