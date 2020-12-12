import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import config from '../../../../assets/config';
import { Theme } from '../../../../assets/theme';
import { ICategories, IState } from '../../../../interfaces';
import SectionTitle from '../../../Layout/SectionTitle';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(5, 0),
        '@media (max-width: 550px)': {
            margin: theme.rem(2, 0),
        },
    },
    wrp: {
        display: 'grid',
        gridTemplateColumns: theme.fr(config.category.grid.desktop),
        gridGap: theme.rem(4, 3),
        '@media (max-width: 1200px)': {
            gridTemplateColumns: theme.fr(config.category.grid.tablet),
        },
        '@media (max-width: 550px)': {
            gridTemplateColumns: theme.fr(config.category.grid.mobile),
            gridGap: theme.rem(2, 1.5),
        },
    },
    cat: {
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.blue[0],
        },
    },
    img: {
        height: theme.rem(14),
        borderRadius: theme.radius,
        objectFit: 'cover',
    },
    text: {
        marginTop: theme.rem(1.5),
        fontSize: theme.rem(1.6),
    },
}));

const Categories = (): ReactElement => {
    const css = useStyles();
    const categories = useSelector<IState, ICategories[]>(state => state.categories);
    return (
        <div className={css.root}>
            <SectionTitle>Арендуйте здесь и сейчас</SectionTitle>

            <div className={css.wrp}>
                {categories?.map(({ name, image, slug }) => (
                    <Link key={name} href={`/offers?category=${slug}`}>
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
