import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { formatCatList } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import { ICategories, IState } from '../../../../interfaces';
import DropDown from '../../DropDown';
import { modal } from '../../Modal';
import RegionModal from '../../RegionModal';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',

        '@media (max-width: 1100px)': {
            justifyContent: 'space-between',
            width: '66%',
        },

        '@media (max-width: 550px)': {
            justifyContent: 'space-between',
            width: '100%',
        },
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        height: theme.rem(7),
        width: '48%',
        padding: theme.rem(2),
        fontSize: theme.rem(1.4),
        background: theme.palette.gray[1],
        borderRadius: theme.radius,
        border: 'none',
        color: theme.palette.primary[0],

        '& span': {
            width: theme.rem(20),
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.6),
        },
    },
    icon: {
        width: theme.rem(2.4),
    },
    drop: {
        width: '48%',
    },
}));

const OptionsMobile = (): ReactElement => {
    const css = useStyles();
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = formatCatList(data);

    const handleRegionModal = () => {
        modal.open(<RegionModal />);
    };

    return (
        <div className={css.root}>
            <div className={css.drop}>
                <DropDown data={categories} placeholder="Выберите категорию" onChange={console.log} height={7} withSub />
            </div>
            <button type="button" className={css.location} onClick={handleRegionModal}>
                <img className={css.icon} src="/emoji/map.png" alt="" />
                <span>
                    Киев, Киевская область Киев, Киевская область Киев, Киевская область Киевская область Киев, Киевская область
                </span>
            </button>
        </div>
    );
};

export default OptionsMobile;
