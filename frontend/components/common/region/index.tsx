import { faCompass } from '@fortawesome/free-regular-svg-icons/faCompass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import { modal } from '../modal';
import RegionModal from './region-modal';

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
    red: {
        color: theme.palette.red[0],
    },
}));

interface IProps {
    className?: string;
}

const Region = ({ className }: IProps): ReactElement => {
    const css = useStyles();

    const handleRegionModal = () => {
        modal.open(<RegionModal />);
    };

    return (
        <button type="button" className={clsx(css.input, className)} onClick={handleRegionModal}>
            <FontAwesomeIcon icon={faCompass} />
            <span>
                Киев, Киевская область Киев, Киевская область Киев, Киевская область Киев, Киевская область Киев, Киевская область
            </span>
        </button>
    );
};

export default Region;
