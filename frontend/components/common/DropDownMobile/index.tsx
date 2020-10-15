import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect, useState } from 'react';
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
    background: theme.palette.blue[2],
    border: theme.border(0.1, theme.palette.gray[3]),
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
    fontSize: theme.rem(1.6),
  },
  box: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    maxHeight: theme.rem(60),
    marginTop: theme.rem(1),
    padding: theme.rem(2, 0),
    background: theme.palette.white,
    borderRadius: theme.radius,
    border: theme.border(0.1, theme.palette.gray[3]),
    fontSize: theme.rem(1.6),
    overflowY: 'scroll',
    zIndex: 10,
  },
  item: {
    fontWeight: theme.text.weight[3],
    '& > button': {
      display: 'block',
      width: '100%',
      padding: theme.rem(1, 2),
      textAlign: 'left',
    },
  },
  sub: {
    position: 'relative',
    marginLeft: theme.rem(2),
    padding: theme.rem(1, 2),
    fontWeight: theme.text.weight[1],
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '60%',
      left: 0,
      transform: 'translateY(-50%)',
      height: '60%',
      width: theme.rem(0.2),
      background: theme.palette.gray[2],
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
  value: IDropList[];
  defaultValue?: string;
  toRight?: boolean;
  transparent?: boolean;
  onSubmit: (
    value: string,
    slug: string,
    type: 'category' | 'sub_category',
  ) => void;
}

const DropDownMobile = ({
  height = 5,
  value,
  onSubmit,
  defaultValue,
  toRight = false,
  transparent = false,
}: Props): ReactElement => {
  const css = useStyles({ height, toRight });

  const [drop, setDrop] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(
    defaultValue || value[0].name,
  );

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  const handleClick = (): void => {
    setDrop(!drop);
  };

  const handleSelect = (
    value: string,
    slug: string,
    type: 'category' | 'sub_category',
  ): void => {
    setDrop(!drop);
    onSubmit(value, slug, type);
    setSelected(value);
  };

  const handleBlur = () => {
    setDrop(false);
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
        <div className={css.box}>
          <ul>
            {value?.map(({ name, slug, sub }) => (
              <li className={css.item} key={slug}>
                <button
                  type="button"
                  onClick={() => {
                    handleSelect(name, slug, 'category');
                  }}
                >
                  {name}
                </button>

                <ul>
                  {sub?.map(({ name, slug }) => (
                    <li
                      className={css.sub}
                      key={slug}
                      aria-hidden
                      onClick={() => {
                        handleSelect(name, slug, 'sub_category');
                      }}
                    >
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownMobile;
