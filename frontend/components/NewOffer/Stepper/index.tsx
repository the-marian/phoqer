import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: theme.rem(80),
    margin: '0 auto 5rem',
  },
  wrp: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',

    '&:not(:nth-last-of-type(1))::after': {
      content: '""',
      position: 'absolute',
      top: '28%',
      left: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      width: '100%',
      height: theme.rem(0.1),
      borderTop: '0.1rem dashed ' + theme.palette.gray[2],
    },
  },
  numWrp: {
    position: 'relative',
    zIndex: 2,
    display: 'block',
    padding: theme.rem(0, 2),
    borderRadius: '50%',
    background: theme.palette.white,
  },
  num: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.rem(4),
    width: theme.rem(4),
    borderRadius: '50%',
    border: theme.border(0.1, theme.palette.gray[2]),
    fontWeight: theme.text.weight[5],
    color: theme.palette.blue[0],
  },
  text: {
    marginTop: theme.rem(1.5),
    fontSize: theme.rem(1.3),
    fontWeight: theme.text.weight[3],
  },
}));

interface Props {
  title: string[];
}

const Stepper = ({ title }: Props): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.root}>
      {title.map((item, index) => (
        <Link key={item} href={`/new_offer/${index + 1}`}>
          <div key={item} className={css.wrp}>
            <span className={css.numWrp}>
              <span className={css.num}>{index + 1}</span>
            </span>
            <p className={css.text}>{item}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Stepper;
