import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../config/theme';
import { IModal, IState } from '../../../interfaces';
import { closeModal } from '../../../redux/modal/actions';

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.modalBack,
    zIndex: 1000,
  },
  inner: {
    position: 'relative',
    width: '100%',
    maxHeight: '95vh',
    padding: theme.rem(2),
    paddingTop: theme.rem(3),
    borderRadius: theme.radius,
    background: theme.palette.white,
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: theme.box.two(1, 1.5),
    fontSize: theme.rem(1.2),
  },
}));

const SIZE = {
  s: '40rem',
  m: '70rem',
  l: '95%',
};

const Modal = (): ReactElement => {
  const dispatch = useDispatch();
  const css = useStyles();
  const { modal, size, dom } = useSelector<IState, IModal>(
    state => state.modal,
  );

  const handleClose = (): void => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent): void => {
      if (event.code === 'Escape') {
        dispatch(closeModal());
      }
    };

    window.addEventListener('keydown', handleEvent);

    return (): void => {
      window.removeEventListener('keydown', handleEvent);
    };
  }, []);

  const handleBackDrop = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal());
    }
  };

  return modal ? (
    <div className={css.wrp} onClick={handleBackDrop} aria-hidden>
      <div className={css.inner} style={{ maxWidth: SIZE[size] }}>
        <button type="button" className={css.button} onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {dom}
      </div>
    </div>
  ) : null;
};

export default Modal;
