import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import useAuth from '../../../../hooks/auth.hook';
import useTrans from '../../../../hooks/trans.hook';
import routes from '../../../../utils/routes';
import mixin from '../../../../utils/theming/mixin';
import { Theme } from '../../../../utils/theming/theme';
import AnimatedBackdrop from '../../animated-backdrop';
import LoginForm from '../../auth-form/login-form';
import { modal } from '../../modal';
import SmallModalWrp from '../../modal/small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        display: 'block',
        width: '100%',
        padding: theme.rem(6),
        borderRadius: theme.radius,
        color: theme.palette.black[0],
        textAlign: 'left',
        background: theme.palette.gray[0],
        ...mixin(theme).outline,

        ...theme.media(550).max({
            padding: theme.rem(3),
        }),
    },
    title: {
        position: 'relative',
        zIndex: 1,
        maxWidth: theme.rem(50),
        marginBottom: theme.rem(1.5),
        fontWeight: theme.text.weight[4],
        fontSize: theme.rem(3),
        color: 'inherit',
    },
    text: {
        position: 'relative',
        zIndex: 1,
        maxWidth: theme.rem(50),
        fontSize: theme.rem(1.8),
        color: 'inherit',
    },
}));

interface IProps {
    className?: string;
}

const Banner = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const trans = useTrans();
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
        <button onClick={handleClick} type="button" className={clsx(css.root, className)}>
            <AnimatedBackdrop />
            <h2 className={css.title}>{trans('share_with_others_and_earn')}</h2>
            <p className={css.text}>{trans('share_with_others_and_earn_text')}</p>
        </button>
    );
};

export default Banner;
