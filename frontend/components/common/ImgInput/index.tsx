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
    height: theme.rem(15),
    width: theme.rem(20),
    margin: '3rem auto',
    borderRadius: theme.radius,
    background: theme.palette.white,
    transition: theme.transitions[0],
    fontSize: theme.rem(3),
    color: theme.palette.gray[2],
    '&:hover': {
      color: theme.palette.blue[0],
    },
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

interface Props {
  onChange: (value: File[]) => void;
}

const ImgInput = ({ onChange }: Props): ReactElement => {
  const css = useStyles();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    if (!files || !files.length) return;
    onChange(Object.values(files));
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
        multiple={true}
      />
    </div>
  );
};

export default ImgInput;
