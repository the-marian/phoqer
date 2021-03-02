import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import useAuth from '../../../../hooks/auth.hook';
import useTrans from '../../../../hooks/trans.hook';
import LoginForm from '../../../Common/Auth/LoginForm';
import { modal } from '../../../Common/Modal';
import SmallModalWrp from '../../../Common/Modal/SmallModalWrp';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(8, 0, 6),
        padding: theme.rem(6),
        borderRadius: theme.radius,
        background: theme.palette.gray[1],
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
        margin: theme.rem(0, 2, 2, 0),
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
    const T = useTrans();
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
                <Image height={60} width={70} className={css.img} src="/emoji/monay.png" alt="" />
                <Image height={60} width={70} className={css.img} src="/emoji/monay.png" alt="" />
                <Image height={60} width={70} className={css.img} src="/emoji/monay.png" alt="" />
            </div>

            <h2 className={css.title}>{T.share_with_others_and_earn}</h2>

            <button className={css.link} type="button" onClick={handleClick}>
                <span>{T.create_offer}</span>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
};

export default Banner;
