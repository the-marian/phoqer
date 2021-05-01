import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../assets/template';
import { Theme } from '../../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    back: {
        display: 'flex',
        alignItems: 'center',
        width: 'max-content',
        height: theme.rem(4),
        padding: theme.rem(0.5, 1.5),
        marginBottom: theme.rem(4),
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        background: theme.palette.gray[0],
        ...template(theme).outline,

        '& span': {
            marginLeft: theme.rem(0.5),
            fontSize: theme.rem(1.6),
        },
    },
}));

interface IProps {
    className?: string;
    children: string;
    href: string;
}

const MobileBackBtn = ({ href, children, className }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <Link href={href}>
            <a className={clsx(css.back, className)}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>{children}</span>
            </a>
        </Link>
    );
};

export default MobileBackBtn;
