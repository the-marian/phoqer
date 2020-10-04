import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import { IDropList } from '../../../interfaces';

interface StyleProp {
  height: number;
  toRight: boolean;
}

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    position: 'relative',
    width: '100%',
    background: theme.palette.gray[0],
    border: theme.border(0.1, theme.palette.gray[1]),
    borderRadius: theme.radius,
    userSelect: 'none',
    outline: 'none',
  },
  wrpTransparent: {
    position: 'relative',
    width: '100%',
    background: 'none',
    border: 'none',
    borderRadius: theme.radius,
    userSelect: 'none',
    outline: 'none',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    height: (props: StyleProp): string => theme.rem(props.height),
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
    padding: theme.rem(2, 0),
    background: theme.palette.white,
    borderRadius: theme.radius,
    border: theme.border(0.1, theme.palette.gray[1]),
    fontSize: theme.rem(1.2),
    overflowY: 'scroll',
  },
  sub: {
    position: 'absolute',
    top: '100%',
    right: (props: StyleProp): string =>
      props.toRight ? 'calc(100% + 1rem)' : 'uset',
    left: (props: StyleProp): string =>
      props.toRight ? 'uset' : 'calc(100% + 1rem)',
    width: '100%',
    maxHeight: theme.rem(30),
    marginTop: theme.rem(1),
  },
  subBox: {
    maxHeight: theme.rem(30),
    padding: theme.rem(2, 0),
    background: theme.palette.white,
    borderRadius: theme.radius,
    border: theme.border(0.1, theme.palette.gray[1]),
    fontSize: theme.rem(1.2),
    overflowY: 'scroll',
  },
  item: {
    padding: theme.rem(1, 3),
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.gray[0],
    },
  },
  icon: {
    marginTop: theme.em(0.4),
    marginRight: theme.rem(1.5),
    fontSize: theme.em(0.7),
  },
}));

interface Props {
  height?: number;
  transparent?: boolean;
  value: IDropList[];
  toRight?: boolean;
  onSubmit: (value: string) => void;
}

const DropDown = ({
  height = 4.5,
  value,
  onSubmit,
  toRight = false,
  transparent = false,
}: Props): ReactElement => {
  const css = useStyles({ height, toRight });
  const [drop, setDrop] = useState<boolean>(false);
  const [hover, setHover] = useState<number | null>(null);
  const [selected, setSelected] = useState(value[0].name);

  const handleClick = (): void => {
    setDrop(!drop);
    setHover(null);
  };

  const handleSelect = (value: string): void => {
    setDrop(!drop);
    onSubmit(value);
    setSelected(value);
  };

  const handleBlur = () => {
    setDrop(false);
    setHover(null);
  };

  return (
    <div
      className={transparent ? css.wrpTransparent : css.wrp}
      tabIndex={-1}
      onBlur={handleBlur}
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
        <>
          <div className={css.box}>
            <ul>
              {value?.map(({ name, sub }, index) => (
                <li
                  className={css.item}
                  key={name}
                  aria-hidden
                  onClick={() => {
                    handleSelect(name);
                  }}
                  onMouseMove={() => {
                    setHover(sub ? index : null);
                  }}
                >
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {value &&
            value?.map(
              ({ name, sub }, index) =>
                sub && (
                  <div
                    key={name}
                    className={css.sub}
                    style={{
                      visibility: hover === index ? 'visible' : 'hidden',
                    }}
                  >
                    <div className={css.subBox}>
                      <ul>
                        {sub?.map(({ name }) => (
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
                  </div>
                ),
            )}
        </>
      )}
    </div>
  );
};

export default DropDown;