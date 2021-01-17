import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 'inherit',
        width: 'max-content',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    text: {
        display: 'inline-block',
        marginRight: theme.em(0.4),
        fontSize: 'inherit',
    },
    icon: {
        fontSize: theme.em(0.7),

        '& svg': {
            width: theme.rem(1),
            height: theme.rem(1),
        },
    },
    leftIcon: {
        margin: theme.em(0, 0.8, 0.1, 0),
        fontSize: theme.em(0.7),

        '& svg': {
            width: theme.rem(1),
            height: theme.rem(1),
        },
    },
}));

interface Props {
    href: string;
    as?: string;
    children: string;
    toLeft?: boolean;
}

const LinkArrow = ({ href, as = null, children, toLeft = false }: Props): ReactElement => {
    const css = useStyles();
    return (
        <Link href={href} as={as}>
            {toLeft ? (
                <a className={css.link}>
                    <span className={css.leftIcon}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                    <span className={css.text}>{children}</span>
                </a>
            ) : (
                <a className={css.link}>
                    <span className={css.text}>{children}</span>
                    <span className={css.icon}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                </a>
            )}
        </Link>
    );
};

export default LinkArrow;
