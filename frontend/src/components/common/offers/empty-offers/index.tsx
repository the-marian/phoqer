import React, { ReactElement } from 'react';

import Link from 'next/link';
import { createUseStyles } from 'react-jss';

import useTrans from '../../../../hooks/trans.hook';
import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';
import AdSense from '../../ads';

const useStyles = createUseStyles((theme: Theme) => ({
    empty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        padding: theme.rem(6, 2),
    },
    img: {
        width: theme.rem(20),
        marginBottom: theme.rem(2),
    },
    emptyText: {
        maxWidth: theme.rem(40),
        marginBottom: theme.rem(2),
        fontSize: theme.rem(1.6),
        color: theme.palette.gray[3],
        textAlign: 'center',
    },
    link: {
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],

        ...theme.hover({
            fontWeight: theme.text.weight[3],
            textDecoration: 'underline',
        }),
    },
    box: {
        margin: theme.rem(4, 0),
        maxHeight: theme.rem(40),
    },
}));

interface IProps {
    text?: string;
}

const EmptyOffers = ({ text }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    return (
        <>
            <div className={css.empty}>
                <img className={css.img} src="/icons/empty.png" alt="" />
                <p className={css.emptyText}>{text || trans('no_offer')}</p>

                <Link href={routes.offers.new(1)}>
                    <a className={css.link}>{trans('make_offer')}</a>
                </Link>
            </div>
            <AdSense type="horizontal" className={css.box} />
        </>
    );
};

export default EmptyOffers;
