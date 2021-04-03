import { faCompass } from '@fortawesome/free-regular-svg-icons/faCompass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { formatCatList } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ICategories, IDropValue, IState } from '../../../../interfaces';
import DropDown from '../../DropDown';
import { modal } from '../../Modal';
import RegionModal from '../../Modal/RegionModal';

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
            width: theme.rem(20),
            fontSize: theme.rem(1.4),
            color: theme.palette.black[0],
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

            ...theme.media(450).max({
                width: theme.rem(15),
            }),

            ...theme.media(350).max({
                width: theme.rem(12),
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
    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = formatCatList(data);

    const handleRegionModal = () => {
        modal.open(<RegionModal />);
    };

    return (
        <div className={css.root}>
            <div className={css.drop}>
                <DropDown data={categories} placeholder={T.select_category} onChange={onChange} height={6} withSub />
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
