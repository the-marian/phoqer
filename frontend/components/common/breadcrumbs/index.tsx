import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'block',
        margin: theme.rem(4, 0, 2),

        '& li': {
            display: 'inline',
            fontWeight: theme.text.weight[2],
            fontSize: theme.rem(1.2),
            color: theme.palette.black[0],

            ...theme.media(768).max({
                lineHeight: '1.6',
                fontSize: theme.rem(1.6),
                fontWeight: theme.text.weight[1],
            }),
        },

        '& a': {
            color: theme.palette.gray[3],

            ...theme.hover({
                textDecoration: 'underline',
                color: theme.palette.black[0],
            }),
        },
    },

    end: {
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],
    },

    gray: {
        color: theme.palette.gray[3],
    },
}));

interface IProps {
    className?: string;
    data: {
        label: string;
        link: string;
    }[];
    end: string;
}

const Breadcrumbs = ({ data, end, className }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <>
            {data?.length ? (
                <ul className={clsx(css.root, className)}>
                    {data.map(({ label, link }) => (
                        <li key={link}>
                            <Link href={link} passHref>
                                <a>{label}</a>
                            </Link>
                            <span className={css.gray}>{' / '}</span>
                        </li>
                    ))}
                    <li>
                        <span className={css.end}>{` ${end}`}</span>
                    </li>
                </ul>
            ) : null}
        </>
    );
};

export default Breadcrumbs;
