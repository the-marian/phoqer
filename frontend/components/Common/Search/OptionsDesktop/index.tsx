import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { formatCatList } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import { ICategories, IState } from '../../../../interfaces';
import DropDown from '../../DropDown';
import Media from '../../Media';
import { modal } from '../../Modal';
import RegionModal from '../../RegionModal';

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
        background: 'none',
        border: 'none',
        color: theme.palette.blue[1],

        '&::before': {
            content: '""',
            display: 'block',
            height: theme.rem(3),
            width: theme.rem(0.1),
            marginRight: theme.rem(1.5),
            background: theme.palette.gray[2],
        },

        '@media (max-width: 900px)': {
            width: '100%',
            height: theme.rem(8),
            background: theme.palette.gray[1],
            borderRadius: theme.radius,
            textAlign: 'left',
            fontSize: theme.rem(1.4),
        },

        '& span': {
            width: theme.rem(20),
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

            '@media (max-width: 900px)': {
                width: '100%',
            },
        },
    },
    icon: {
        width: theme.rem(2.4),
    },
    categories: {
        display: 'flex',
        alignItems: 'center',
        width: '50%',

        '&::before': {
            content: '""',
            display: 'block',
            height: theme.rem(3),
            width: theme.rem(0.1),
            background: theme.palette.gray[2],
        },
    },
}));

const OptionsDesktop = (): ReactElement => {
    const css = useStyles();
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = formatCatList(data);

    const handleRegionModal = () => {
        modal.open(<RegionModal />);
    };

    return (
        <Media className={css.container} size={1100}>
            <button type="button" className={css.location} onClick={handleRegionModal}>
                <img className={css.icon} src="/emoji/map.png" alt="" />
                <span>Киев, Киевская область Киев, Киевская область Киев, Киевская область</span>
            </button>

            <div className={css.categories}>
                <DropDown data={categories} onChange={console.log} withSub transparent />
            </div>
        </Media>
    );
};

export default OptionsDesktop;
