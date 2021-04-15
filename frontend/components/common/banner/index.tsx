import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../assets/routes';
import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import trans from '../../../assets/trans';
import useAuth from '../../../hooks/auth.hook';
import LoginForm from '../auth/login-form';
import { modal } from '../modal';
import SmallModalWrp from '../modal/small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes grad': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
    },
    root: {
        display: 'block',
        width: '100%',
        padding: theme.rem(6),
        borderRadius: theme.radius,
        background: theme.palette.soft[1],
        color: theme.palette.trueBlack,
        textAlign: 'left',
        ...template(theme).outline,

        ...theme.media(550).max({
            padding: theme.rem(3),
        }),
    },
    animation: {
        background: 'linear-gradient(-45deg, #f9ecff, #e9c4ff, #ddfcf8, #f5f1e5, #ffd0d0, #e4f4f6)',
        backgroundSize: '400% 400%',
        animation: '$grad 15s ease infinite',
    },
    title: {
        maxWidth: theme.rem(50),
        marginBottom: theme.rem(1.5),
        fontWeight: theme.text.weight[4],
        fontSize: theme.rem(3),
        color: 'inherit',
    },
    text: {
        maxWidth: theme.rem(50),
        fontSize: theme.rem(1.8),
        color: 'inherit',
    },
}));

interface IProps {
    animation?: boolean;
    className?: string;
}

const Banner = ({ className, animation = false }: IProps): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const history = useRouter();

    const handleClick = (): void => {
        if (auth?.access_token) {
            history.push(routes.offers.new(1));
        } else {
            modal.open(
                <SmallModalWrp>
                    <LoginForm />
                </SmallModalWrp>,
            );
        }
    };
    return (
        <button onClick={handleClick} type="button" className={clsx(css.root, className, animation && css.animation)}>
            <h2 className={css.title}>{trans('share_with_others_and_earn')}</h2>
            <p className={css.text}>Разместите объявление на любую тематику и получайте дополнительный заработок прямо сейчас.</p>
        </button>
    );
};

export default Banner;
