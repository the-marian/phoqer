import { faCompass } from '@fortawesome/free-regular-svg-icons/faCompass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { findCategory, findSubCategory, formatCatList } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import trans from '../../../../assets/trans';
import { ICategories, IDropValue, ISearch, IState } from '../../../../interfaces';
import DropDown from '../../drop-down';
import { modal } from '../../modal';
import RegionModal from '../../modal/region-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: theme.rem(50),
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        height: '100%',
        padding: theme.rem(2),
        fontSize: theme.rem(1.6),
        background: 'none',
        border: 'none',
        color: theme.palette.primary[0],

        '& span': {
            width: theme.rem(20),
            fontSize: theme.rem(1.4),
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: theme.palette.black[0],
        },
    },
    icon: {
        width: theme.rem(2.4),
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
            <button type="button" className={css.location} onClick={handleRegionModal}>
                <FontAwesomeIcon icon={faCompass} />
                <span>Киев, Киевская область Киев, Киевская область Киев, Киевская область</span>
            </button>
        </div>
    );
};

export default OptionsDesktop;
