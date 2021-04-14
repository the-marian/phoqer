import { faCompass } from '@fortawesome/free-regular-svg-icons/faCompass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { findCategory, findSubCategory, formatCatList } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ICategories, IDropValue, ISearch, IState } from '../../../../interfaces';
import DropDown from '../../drop-down';
import { modal } from '../../modal';
import RegionModal from '../../modal/region-modal';

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
    location: {
        display: 'flex',
        alignItems: 'center',
        height: theme.rem(6),
        width: '48%',
        padding: theme.rem(2),
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],
        background: theme.palette.gray[1],
        borderRadius: theme.radius,
        border: 'none',

        '& span': {
            width: '80%',
            fontSize: theme.rem(1.4),
            color: theme.palette.black[0],
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

            ...theme.media(768).max({
                fontSize: theme.rem(1.6),
            }),
        },

        ...theme.media(768).max({
            fontSize: theme.rem(1.6),
        }),
    },
    icon: {
        width: theme.rem(2.4),
    },
    drop: {
        width: '48%',
    },
}));

interface IProps {
    onChange: (value: IDropValue | null) => void;
}

const OptionsMobile = ({ onChange }: IProps): ReactElement => {
    const css = useStyles();
    const T = useTrans();

    const search = useSelector<IState, ISearch>(state => state.config.searchParams);
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = formatCatList(data);

    const defaultValue = search.category
        ? findCategory(data, search.category)
        : search.sub_category
        ? findSubCategory(data, search.sub_category)
        : null;

    const handleRegionModal = () => {
        modal.open(<RegionModal />);
    };

    return (
        <div className={css.root}>
            <div className={css.drop}>
                <DropDown
                    data={categories}
                    defaultValue={defaultValue}
                    placeholder={T.select_category}
                    onChange={onChange}
                    height={6}
                    withSub
                />
            </div>
            <button type="button" className={css.location} onClick={handleRegionModal}>
                <FontAwesomeIcon icon={faCompass} />
                <span>
                    Киев, Киевская область Киев, Киевская область Киев, Киевская область Киевская область Киев, Киевская область
                </span>
            </button>
        </div>
    );
};

export default OptionsMobile;
