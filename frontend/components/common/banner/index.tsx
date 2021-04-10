import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../assets/routes';
import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useTrans from '../../../hooks/trans.hook';
import LoginForm from '../auth/login-form';
import { modal } from '../modal';
import SmallModalWrp from '../modal/small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'block',
        width: '100%',
        padding: theme.rem(6),
        borderRadius: theme.radius,
        background: theme.palette.gray[1],
        color: theme.palette.black[0],
        textAlign: 'left',
        ...template(theme).outline,

        ...theme.media(550).max({
            padding: theme.rem(3),
        }),
    },
    title: {
        color: theme.palette.black[0],
        marginBottom: theme.rem(1.5),
        fontSize: theme.rem(3),
        fontWeight: theme.text.weight[4],
    },
    text: {
        fontSize: theme.rem(1.8),
    },
    imgWrp: {
        display: 'flex',
    },
    img: {
        display: 'block',
        objectFit: 'contain',
        margin: theme.rem(0, 2, 2, 0),
    },
}));

interface IProps {
    className?: string;
}

const Banner = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const T = useTrans();
    const history = useRouter();

    const handleClick = (): void => {
        if (auth?.access_token) {
            history.push(routes.new_offer(1));
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
            <div className={css.imgWrp}>
                <Image height={60} width={70} className={css.img} src="/emoji/monay.png" alt="" />
                <Image height={60} width={70} className={css.img} src="/emoji/monay.png" alt="" />
                <Image height={60} width={70} className={css.img} src="/emoji/monay.png" alt="" />
            </div>

            <h2 className={css.title}>{T.share_with_others_and_earn}</h2>
            <p className={css.text}>{T.create_offer}</p>
        </button>
    );
};

export default Banner;
