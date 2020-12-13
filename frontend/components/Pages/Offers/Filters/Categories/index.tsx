import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
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
    },
}));

const Categories = (): ReactElement => {
    const css = useStyles();

    const { query } = useRouter();
    const { category, sub_category } = query;

    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [subCategoryName, setSubCategoryName] = useState<string | null>(null);

    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = helpers.formatCatList(data);

    useEffect(() => {
        if (category) {
            setCategoryName(helpers.findCategory(data, typeof category === 'string' ? category : category[0]));
        }
    }, [category]);

    useEffect(() => {
        if (sub_category) {
            setSubCategoryName(helpers.findSubCategory(data, typeof sub_category === 'string' ? sub_category : sub_category[0]));
        }
    }, [sub_category]);

    return (
        !!categories?.length && (
            <div>
                <h4 className={css.title}>Категория</h4>
                <DropDown data={categories} onChange={console.log} withSub />
            </div>
        )
    );
};

export default Categories;
