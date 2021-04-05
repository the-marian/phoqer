import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import config from '../../../../assets/config';
import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ICategories, IState } from '../../../../interfaces';
import SectionTitle from '../../../Common/SectionTitle';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(6, 0, 4),
        ...theme.media(550).max({
            margin: theme.rem(2, 0),
        }),
    },
    wrp: {
        display: 'grid',
        gridTemplateColumns: theme.fr(config.category.grid.desktop),
        gridGap: theme.rem(4, 3),
        ...theme.media(1200).max({
            gridTemplateColumns: theme.fr(config.category.grid.tablet),
        }),
        ...theme.media(960).max({
            gridTemplateColumns: theme.fr(config.category.grid.smallTablet),
        }),
        ...theme.media(550).max({
            gridTemplateColumns: theme.fr(config.category.grid.mobile),
            gridGap: theme.rem(2, 1.5),
        }),
    },
    cat: {
        cursor: 'pointer',
        color: theme.palette.black[0],

        ...theme.hover({
            color: theme.palette.primary[0],
        }),
    },
    img: {
        height: theme.rem(14),
        borderRadius: theme.radius,
        objectFit: 'cover',
        ...template(theme).outline,
    },
    text: {
        marginTop: theme.rem(1.5),
        fontSize: theme.rem(1.6),
    },
}));

const Categories = (): ReactElement => {
    const css = useStyles();
    const T = useTrans();
    const categories = useSelector<IState, ICategories[]>(state => state.categories);

    return (
        <div className={css.root}>
            <SectionTitle>{T.rent_here_and_now}</SectionTitle>

            <div className={css.wrp}>
                {categories?.map(({ name, image, slug }) => (
                    <Link key={name} href={routes.offers.single(`?category=${slug}`)}>
                        <div className={css.cat}>
                            <img className={css.img} src={image} alt={name} />
                            <p className={css.text}>{name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
