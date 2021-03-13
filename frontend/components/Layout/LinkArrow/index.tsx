import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
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
        fontSize: theme.em(1),
    },
    leftIcon: {
        margin: theme.em(0, 0.8, 0.1, 0),
        fontSize: theme.em(0.7),
    },
}));

interface Props {
    href: string;
    as?: string | null;
    children: string;
    toLeft?: boolean;
}

const LinkArrow = ({ href, as = null, children, toLeft = false }: Props): ReactElement => {
    const css = useStyles();
    return as ? (
        <Link href={href} as={as} passHref>
            <a className={css.link}>
                {toLeft && (
                    <span className={css.leftIcon}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                )}
                <span className={css.text}>{children}</span>
                {!toLeft && (
                    <span className={css.icon}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                )}
            </a>
        </Link>
    ) : (
        <Link href={href} passHref>
            <a className={css.link}>
                {toLeft && (
                    <span className={css.leftIcon}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                )}
                <span className={css.text}>{children}</span>
                {!toLeft && (
                    <span className={css.icon}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                )}
            </a>
        </Link>
    );
};

export default LinkArrow;
