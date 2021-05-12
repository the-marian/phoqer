import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { findCategory, findSubCategory, formatCatList } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { ICategories, IDropValue, ISearch, IState } from '../../../../interfaces';
import DropDown from '../../drop-down';
import Region from '../../region';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',

        ...theme.media(1100).max({
            justifyContent: 'space-between',
            width: '66%',
        }),
        ...theme.media(550).max({
            justifyContent: 'space-between',
            width: '100%',
        }),
    },
    region: {
        background: theme.palette.gray[1],
        boxShadow: 'none',
        width: '49%',
        ...theme.hover({
            color: theme.palette.primary[0],
            border: theme.border(0.2, 'transparent'),
        }),
        ...theme.focus({
            color: theme.palette.primary[0],
            border: theme.border(0.2, 'transparent'),
        }),
    },
    drop: {
        width: '49%',
    },
}));

interface IProps {
    onChange: (value: IDropValue | null) => void;
}

const OptionsMobile = ({ onChange }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const tablet = useMedia(1100);

    const search = useSelector<IState, ISearch>(state => state.config.searchParams);
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = formatCatList(data);

    const defaultValue = search.category
        ? findCategory(data, search.category)
        : search.sub_category
        ? findSubCategory(data, search.sub_category)
        : null;

    return (
        <div className={css.root}>
            <div className={css.drop}>
                <DropDown
                    data={categories}
                    defaultValue={defaultValue}
                    placeholder={trans('select_category')}
                    onChange={onChange}
                    height={tablet ? 6 : 5}
                    withSub
                />
            </div>
            <Region className={css.region} />
        </div>
    );
};

export default OptionsMobile;
