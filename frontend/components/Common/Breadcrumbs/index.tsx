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

            '& > span': {
                color: theme.palette.primary[0],
                fontWeight: theme.text.weight[3],
            },
        },

        '& a': {
            color: theme.palette.gray[3],

            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.black[0],
            },
        },
    },
}));

interface IProps {
    data: {
        label: string;
        link: string;
        as?: string | null;
    }[];
    end: string;
}

const Breadcrumbs = ({ data, end }: IProps): ReactElement => {
    const css = useStyles();

    return data?.length ? (
        <ul className={css.root}>
            {data.map(({ label, link, as }) => (
                <li key={link}>
                    <Link href={link} as={as} passHref>
                        <a>{label}</a>
                    </Link>
                    <span>{' / '}</span>
                </li>
            ))}
            <li>
                <span>{` ${end}`}</span>
            </li>
        </ul>
    ) : null;
};

export default Breadcrumbs;
