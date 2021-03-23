import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import Advertising from '../../../Common/Advertising';
import { modal } from '../../../Common/Modal';
import ConfettiWrp from '../../../Common/Сonfetti';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: theme.rem(3, 0, 4),
        padding: theme.rem(2, 1),
        background: theme.palette.soft[0],
        borderRadius: theme.radius,
        color: theme.palette.black[0],

        ...template(theme).outline,
    },
    img: {
        height: theme.rem(10),
        width: theme.rem(10),
    },
    wrp: {
        width: '60%',
        marginRight: theme.rem(3),
        textAlign: 'left',
        fontSize: theme.rem(1.4),
    },
    title: {
        fontSize: theme.rem(1.6),
        marginBottom: theme.rem(1),
        fontWeight: theme.text.weight[3],
        lineHeight: 1.2,
    },
}));

const Gift = (): ReactElement => {
    const css = useStyles();

    const handleClick = (): void => {
        modal.open(
            <>
                <ConfettiWrp />
                <Advertising />
            </>,
        );
    };

    return (
        <button type="button" className={css.root} onClick={handleClick}>
            <div className={css.wrp}>
                <h2 className={css.title}>У нас есть подарок для вас</h2>
                <p>Кликай прямо сейчас</p>
            </div>
            <img className={css.img} src="/gift.svg" alt="" />
        </button>
    );
};

export default Gift;
