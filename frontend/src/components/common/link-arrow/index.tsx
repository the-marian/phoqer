import React, { ReactElement } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 'inherit',
        width: 'max-content',
        color: 'inherit',
        padding: theme.rem(1),
        borderRadius: theme.radius,
        transition: theme.transitions[1],
        ...theme.hover({
            background: theme.palette.gray[1],
        }),
    },
    text: {
        display: 'inline-block',
        marginRight: theme.em(0.4),
        fontSize: 'inherit',
    },
    icon: {
        fontSize: theme.em(0.7),
        marginTop: theme.em(0.2),
    },
    leftIcon: {
        margin: theme.em(0, 0.8, 0.1, 0),
        fontSize: theme.em(0.7),
    },
}));

interface Props {
    href: string;
    children: string;
    toLeft?: boolean;
}

const LinkArrow = ({ href, children, toLeft = false }: Props): ReactElement => {
    const css = useStyles();
    return (
        <Link href={href}>
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