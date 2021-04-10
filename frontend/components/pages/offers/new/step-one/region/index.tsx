import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import { modal } from '../../../../../common/modal';
import RegionModal from '../../../../../common/modal/region-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    map: {
        width: theme.rem(2.4),
    },
    inner: {
        margin: theme.rem(3, 0),
    },
    title: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
    },
    input: {
        display: 'flex',
        alignItems: 'center',
        height: theme.rem(6),
        width: '100%',
        padding: theme.rem(1, 2),
        background: theme.palette.trueWhite,
        border: 'none',
        borderRadius: theme.radius,
        fontSize: theme.rem(1.3),
        boxShadow: theme.shadow[1],

        '& span': {
            width: '88%',
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',

            ...theme.media(900).max({
                width: '100%',
            }),
        },
    },
    red: {
        color: theme.palette.red[0],
    },
}));

const Region = (): ReactElement => {
    const css = useStyles();

    const handleRegionModal = () => {
        modal.open(<RegionModal />);
    };

    return (
        <div className={css.inner}>
            <h4 className={css.title}>
                Укажите ваше местоположение <span className={css.red}>*</span>
            </h4>
            <button type="button" className={css.input} onClick={handleRegionModal}>
                <img className={css.map} src="/emoji/map.png" alt="" />
                <span>
                    Киев, Киевская область Киев, Киевская область Киев, Киевская область Киев, Киевская область Киев, Киевская
                    область
                </span>
            </button>
        </div>
    );
};

export default Region;
