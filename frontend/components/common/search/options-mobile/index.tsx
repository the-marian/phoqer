import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            width: '100%',
        }),
    },
    region: {
        width: '49%',
    },
    drop: {
        width: '49%',
    },
    submit: {
        marginTop: theme.rem(2),
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],

        ...theme.hover({
            textDecoration: 'underline',
        }),

        '& svg': {
            marginLeft: theme.rem(1),
            fontSize: theme.rem(1.2),
        },
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
        <>
            <div className={css.root}>
                <div className={css.drop}>
                    <DropDown
                        data={categories}
                        defaultValue={defaultValue}
                        placeholder={trans('select_category')}
                        onChange={onChange}
                        height={tablet ? 6 : 5}
                        withSub
                        white
                    />
                </div>
                <Region className={css.region} />
            </div>
            <button className={css.submit} type="submit">
                <span>{trans('search')}</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
        </>
    );
};

export default OptionsMobile;
