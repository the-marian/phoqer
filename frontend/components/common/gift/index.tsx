import React, { CSSProperties, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import useTrans from '../../../hooks/trans.hook';
import template from '../../../utils/theming/template';
import { Theme } from '../../../utils/theming/theme';
import Advertising from '../advertising';
import ConfettiWrp from '../confetti';
import { modal } from '../modal';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes grad': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '99% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: theme.rem(2, 1),
        background: `linear-gradient(-50deg, ${theme.palette.grad})`,
        backgroundSize: '300% 300%',
        animation: '$grad 10s ease infinite',
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
            <div className={css.wrp}>
                <h2 className={css.title}>{trans('this_is_your_gift')}</h2>
                <p>{trans('this_is_your_gift_text')}</p>
            </div>
            <img className={css.img} src="/emoji/gift.png" alt="" />
        </button>
    );
};

export default Gift;
