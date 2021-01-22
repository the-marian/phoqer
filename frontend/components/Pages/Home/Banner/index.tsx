import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import useAuth from '../../../../hooks/auth.hook';
import LoginForm from '../../../Common/Auth/LoginForm';
import { modal } from '../../../Common/Modal';
import SmallModalWrp from '../../../Common/Modal/SmallModalWrp';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(14, 0),
        padding: theme.rem(6),
        borderRadius: theme.radius,
        background: theme.palette.soft[0],
        color: theme.palette.black[0],

        '@media (max-width: 550px)': {
            margin: theme.rem(4, 0),
            padding: theme.rem(3),
        },
    },
    title: {
        color: theme.palette.black[0],
        marginBottom: theme.rem(1.5),
        fontSize: theme.rem(3),
        fontWeight: theme.text.weight[5],
    },
    imgWrp: {
        display: 'flex',
    },
    img: {
        display: 'block',
        objectFit: 'contain',
        width: theme.rem(10),
        height: 'auto',
        margin: theme.rem(0, 2, 2, 0),

        '@media (max-width: 650px)': {
            width: theme.rem(4.5),
        },
    },
    link: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[3],
        color: theme.palette.black[0],

        '&:hover': {
            textDecoration: 'underline',
        },

        '& svg': {
            height: theme.rem(1.6),
            width: theme.rem(1.6),
        },
    },
}));

const Banner = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const history = useRouter();

    const handleClick = (): void => {
        if (auth?.auth_token) {
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
        <div className={css.root}>
            <div className={css.imgWrp}>
                <img className={css.img} src="/emoji/monay.png" alt="" />
                <img className={css.img} src="/emoji/monay.png" alt="" />
                <img className={css.img} src="/emoji/monay.png" alt="" />
            </div>

            <h2 className={css.title}>Делитесь с другими и зарабатывайте</h2>

            <button className={css.link} type="button" onClick={handleClick}>
                <span>Сдать вещи в аренду</span>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
};

export default Banner;
