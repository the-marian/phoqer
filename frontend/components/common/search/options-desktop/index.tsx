import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { findCategory, findSubCategory, formatCatList } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ICategories, IDropValue, ISearch, IState } from '../../../../interfaces';
import DropDown from '../../drop-down';
import Region from '../../region';

const useStyles = createUseStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: theme.rem(50),
    },
    region: {
        background: theme.palette.gray[1],
        boxShadow: 'none',
        width: '50%',

        ...theme.hover({
            color: theme.palette.primary[0],
            border: theme.border(0.2, 'transparent'),
        }),
        ...theme.focus({
            color: theme.palette.primary[0],
            border: theme.border(0.2, 'transparent'),
        }),
    },
    categories: {
        display: 'flex',
        alignItems: 'center',
        width: '50%',
    },
    line: {
        display: 'block',
        height: theme.rem(3),
        width: theme.rem(0.1),
        marginRight: theme.rem(0.1),
        background: theme.palette.gray[2],
    },
}));

interface IProps {
    onChange: (value: IDropValue | null) => void;
}

const OptionsDesktop = ({ onChange }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    const search = useSelector<IState, ISearch>(state => state.config.searchParams);
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = formatCatList(data);

    const defaultValue = search.category
        ? findCategory(data, search.category)
        : search.sub_category
        ? findSubCategory(data, search.sub_category)
        : null;

    return (
        <div className={css.container}>
            <span className={css.line} />
            <div className={css.categories}>
                <DropDown
                    defaultValue={defaultValue}
                    data={categories}
                    placeholder={trans('select_category')}
                    onChange={onChange}
                    height={6}
                    withSub
                    transparent
                />
            </div>
            <span className={css.line} />
            <Region className={css.region} />
        </div>
    );
};

export default OptionsDesktop;
