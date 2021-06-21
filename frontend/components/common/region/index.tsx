import { faCompass } from '@fortawesome/free-regular-svg-icons/faCompass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import useTrans from '../../../hooks/trans.hook';
import { IRegion, IState } from '../../../interfaces';
import template from '../../../utils/theming/template';
import { Theme } from '../../../utils/theming/theme';
import { modal } from '../modal';
import CityModal from './city-modal';
import CountryModal from './country-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    input: {
        ...template(theme).input,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: theme.palette.white,
        color: theme.palette.black[0],

        '& span': {
            ...template(theme).cutString,
            width: 'calc(100% - 3rem)',
            textAlign: 'left',
        },

        '& svg': {
            fontSize: theme.rem(1.8),
        },
    },
    placeholder: {
        color: theme.palette.gray[3],
    },
    error: {
        border: theme.border(0.1, theme.palette.red[0]),
        color: theme.palette.red[0],
    },
    errorText: {
        marginTop: theme.rem(1),
        color: theme.palette.red[0],
        fontSize: theme.rem(1.2),
    },
}));

interface IProps {
    resetError?: (value: { region: string }) => void;
    className?: string;
    error?: string;
}

const Region = ({ className, error, resetError }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const region = useSelector<IState, IRegion>(state => state.region);

    const handleRegionModal = () => {
        if (resetError) resetError({ region: '' });
        modal.open(region.selected?.country ? <CityModal /> : <CountryModal />);
    };

    return (
        <>
            <button type="button" className={clsx(css.input, className, error && css.error)} onClick={handleRegionModal}>
                <FontAwesomeIcon icon={faCompass} />
                <span className={clsx(!region?.selected?.country && !region?.selected?.city && css.placeholder)}>
                    {region?.selected?.country && region?.selected?.city
                        ? trans(region?.selected.country) + ', ' + trans(region?.selected.city)
                        : null}
                    {region?.selected?.country && !region?.selected?.city ? trans(region?.selected.country) : null}
                    {!region?.selected?.country && region?.selected?.city ? trans('Select your region...') : null}
                    {!region?.selected?.country && !region?.selected?.city ? trans('Select your region...') : null}
                </span>
            </button>
            {error && <p className={css.errorText}>{trans(error)}</p>}
        </>
    );
};

export default Region;
