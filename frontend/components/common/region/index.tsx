import { faCompass } from '@fortawesome/free-regular-svg-icons/faCompass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useTrans from '../../../hooks/trans.hook';
import { IRegion, IState } from '../../../interfaces';
import { modal } from '../modal';
import CityModal from './city-modal';
import CountryModal from './country-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    input: {
        ...template(theme).input,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: theme.palette.trueWhite,
        color: theme.palette.black[0],

        '& span': {
            width: 'calc(100% - 3rem)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
        },

        '& svg': {
            fontSize: theme.rem(1.8),
        },
    },
    placeholder: {
        color: theme.palette.gray[3],
    },
}));

interface IProps {
    className?: string;
}

const Region = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const region = useSelector<IState, IRegion>(state => state.region);

    const handleRegionModal = () => {
        modal.open(region.selected?.country ? <CityModal /> : <CountryModal />);
    };

    return (
        <button type="button" className={clsx(css.input, className)} onClick={handleRegionModal}>
            <FontAwesomeIcon icon={faCompass} />
            <span className={clsx(!region?.selected?.country && !region?.selected?.city && css.placeholder)}>
                {region?.selected?.country && region?.selected?.city
                    ? trans(region?.selected.country) + ', ' + trans(region?.selected.city)
                    : null}

                {region?.selected?.country && !region?.selected?.city ? trans(region?.selected.country) : null}
                {!region?.selected?.country && !region?.selected?.city ? trans('Select your region...') : null}
            </span>
        </button>
    );
};

export default Region;
