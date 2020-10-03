import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    position: 'relative',
    marginTop: theme.rem(5),
    background: theme.palette.gray[0],
    border: theme.border(0.1, theme.palette.gray[1]),
    borderRadius: theme.radius,
    userSelect: 'none',
    outline: 'none',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    height: (props: number): string => theme.rem(props),
    margin: 0,
    padding: theme.rem(2),
    cursor: 'pointer',
    fontSize: theme.rem(1.2),
  },
  box: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    maxHeight: theme.rem(30),
    marginTop: theme.rem(1),
    padding: theme.rem(2),
    background: theme.palette.white,
    borderRadius: theme.radius,
    border: theme.border(0.1, theme.palette.gray[1]),
    fontSize: theme.rem(1.2),
    overflowY: 'scroll',
  },
  item: {
    padding: theme.rem(1),
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  icon: {
    marginTop: theme.em(0.4),
    marginRight: theme.rem(1),
    fontSize: theme.em(0.7),
  },
}));

interface Props {
  height?: number;
  value: { name: string }[];
  onSubmit: (value: string) => void;
}

const DropDown = ({ height = 4.5, value, onSubmit }: Props): ReactElement => {
  const css = useStyles(height);
  const [drop, setDrop] = useState(false);
  const [selected, setSelected] = useState(value[0].name);

  const handleClick = (): void => {
    setDrop(!drop);
  };

  const handleSelect = (value: string): void => {
    setDrop(!drop);
    onSubmit(value);
    setSelected(value);
  };

  return (
    <div
      className={css.wrp}
      tabIndex={-1}
      onBlur={() => {
        setDrop(false);
      }}
    >
      <p className={css.inner} onClick={handleClick} aria-hidden>
        {drop ? (
          <span className={css.icon}>
            <FontAwesomeIcon icon={faChevronUp} />
          </span>
        ) : (
          <span className={css.icon}>
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        )}
        <span>{selected}</span>
      </p>

      {drop && (
        <div className={css.box}>
          <ul>
            {value.map(({ name }) => (
              <li
                className={css.item}
                key={name}
                aria-hidden
                onClick={() => {
                  handleSelect(name);
                }}
              >
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
