import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

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
    marginTop: theme.em(0.4),
    fontSize: theme.em(0.7),
  },
}));

interface Props {
  href: string;
  children: string;
}

const LinkArrow = ({ href, children }: Props): ReactElement => {
  const css = useStyles();
  return (
    <Link href={href}>
      <a className={css.link}>
        <span className={css.text}>{children}</span>
        <span className={css.icon}>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </a>
    </Link>
  );
};

export default LinkArrow;
