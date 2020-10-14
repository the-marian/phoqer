import React, { MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.rem(5),
    fontSize: theme.rem(1.4),
    flexWrap: 'wrap',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.rem(1, 4, 1, 0),
  },
  label: {
    display: 'inline-block',
    height: theme.rem(2.5),
    width: theme.rem(2.5),
    marginRight: theme.rem(1.5),
    background: theme.palette.blue[2],
    borderRadius: theme.radius,
    border: theme.border(0.1, theme.palette.blue[0]),
  },
  active: {
    position: 'relative',
    display: 'inline-block',
    height: theme.rem(2.5),
    width: theme.rem(2.5),
    marginRight: theme.rem(1.5),
    background: theme.palette.red[0],
    border: theme.border(0.1, theme.palette.red[0]),
    borderRadius: theme.radius,
    '&::before': {
      content: '""',
      position: 'absolute',
      left: theme.rem(0.9),
      top: theme.rem(0.5),
      width: theme.rem(0.5),
      height: theme.rem(1),
      border: 'solid white',
      borderWidth: theme.rem(0, 0.3, 0.3, 0),
      transform: 'rotate(45deg)',
    },
  },
}));

interface State {
  top: boolean;
  checked: boolean;
  pledge: boolean;
}

const Checkbox = (): ReactElement => {
  const css = useStyles();
  const [state, setState] = useState<State>({
    top: false,
    checked: false,
    pledge: false,
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setState({
      ...state,
      [event.currentTarget.name]: !state[event.currentTarget.name],
    });
  };

  return (
    <div className={css.root}>
      <button
        type="button"
        name="top"
        className={css.btn}
        onClick={handleClick}
      >
        <span className={state.top ? css.active : css.label} />
        <span>Только ТОП объявления</span>
      </button>

      <button
        type="button"
        name="checked"
        className={css.btn}
        onClick={handleClick}
      >
        <span className={state.checked ? css.active : css.label} />
        <span>Проверенные</span>
      </button>

      <button
        type="button"
        name="pledge"
        className={css.btn}
        onClick={handleClick}
      >
        <span className={state.pledge ? css.active : css.label} />
        <span>Без залога</span>
      </button>
    </div>
  );
};

export default Checkbox;
