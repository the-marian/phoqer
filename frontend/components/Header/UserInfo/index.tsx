import { faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import NewNotif from '../../common/NewNotif';

const useStyles = createUseStyles((theme: Theme) => ({
  flex: {
    display: 'flex',
    fontSize: theme.rem(1.2),
  },
  item: {
    marginLeft: theme.rem(2),
    '@media (max-width: 500px)': {
      marginLeft: theme.rem(1.2),
    },
  },
  text: {
    marginLeft: theme.rem(1),
    '@media (max-width: 600px)': {
      fontSize: 0,
    },
  },
  link: {
    position: 'relative',
    color: theme.palette.black[0],
    '&:hover': {
      color: theme.palette.blue[0],
    },
  },
}));

const UserInfo = (): ReactElement => {
  const css = useStyles();
  return (
    <ul className={css.flex}>
      <li className={css.item}>
        <Link href="/new_offer/1">
          <a className={css.link}>
            <FontAwesomeIcon icon={faPlus} />
            <span className={css.text}>Сдать в аренду</span>
          </a>
        </Link>
      </li>
      <li className={css.item}>
        <Link href="/selected">
          <a className={css.link}>
            <FontAwesomeIcon icon={faStar} />
            <span className={css.text}>Избранное</span>
          </a>
        </Link>
      </li>
      <li className={css.item}>
        <button type="button" className={css.link}>
          <FontAwesomeIcon icon={faUser} />
          <span className={css.text}>Влад Василенко</span>

          <NewNotif>14</NewNotif>
        </button>
      </li>
    </ul>
  );
};

export default UserInfo;
