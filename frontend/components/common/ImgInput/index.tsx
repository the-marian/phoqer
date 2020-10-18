import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

//camera-retro
const useStyles = createUseStyles((theme: Theme) => ({
  add: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: theme.rem(15),
    borderRadius: theme.radius,
    background: theme.palette.white,
    transition: theme.transitions[0],
    fontSize: theme.rem(3),
    color: theme.palette.gray[2],
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
}));

const ImgInput = (): ReactElement => {
  const css = useStyles();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    console.log(files);
    if (!files || !files.length) return;
  };

  return (
    <div className={css.add}>
      <FontAwesomeIcon icon={faCameraRetro} />
      <input
        type="file"
        className={css.input}
        onChange={handleChange}
        name="img"
        accept=".jpg, .jpeg, .png, .webp"
      />
    </div>
  );
};

export default ImgInput;
