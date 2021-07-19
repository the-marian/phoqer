import React, { CSSProperties, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import useTrans from '../../../hooks/trans.hook';
import template from '../../../utils/theming/template';
import { Theme } from '../../../utils/theming/theme';
import Advertising from '../advertising';
import ConfettiWrp from '../confetti';
import GradientBackdrop from '../gradient-backdrop';
import { modal } from '../modal';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: theme.rem(2, 1),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        color: theme.palette.black[0],
        ...template(theme).outline,
    },
    img: {
        position: 'relative',
        zIndex: 2,
        height: theme.rem(10),
        width: theme.rem(10),
    },
    wrp: {
        position: 'relative',
        zIndex: 2,
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

interface IProps {
    style?: CSSProperties;
}
const Gift = ({ style = {} }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    const handleClick = (): void => {
        modal.open(
            <>
                <ConfettiWrp />
                <Advertising />
            </>,
        );
    };

    return (
        <button type="button" style={style} className={css.root} onClick={handleClick}>
            <GradientBackdrop />
            <div className={css.wrp}>
                <h2 className={css.title}>{trans('this_is_your_gift')}</h2>
                <p>{trans('this_is_your_gift_text')}</p>
            </div>
            <img className={css.img} src="/emoji/gift.png" alt="" />
        </button>
    );
};

export default Gift;
