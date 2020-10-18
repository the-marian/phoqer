import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { Theme } from '../../../config/theme';
import { openModal } from '../../../redux/modal/actions';
import RegionModal from '../../common/RegionModal';

const useStyles = createUseStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.rem(1),
    fontSize: theme.rem(1.4),
    fontWeight: theme.text.weight[2],
  },
  input: {
    display: 'flex',
    alignItems: 'center',
    height: theme.rem(6),
    width: '100%',
    padding: theme.rem(1, 2),
    background: theme.palette.gray[1],
    border: 'none',
    borderRadius: theme.radius,
    fontSize: theme.rem(0.91),
    '& span': {
      marginLeft: theme.rem(1.5),
      fontSize: theme.rem(1.3),
    },
  },
}));

const Region = (): ReactElement => {
  const css = useStyles();
  const dispatch = useDispatch();

  const handleRegionModal = () => {
    dispatch(openModal({ dom: <RegionModal /> }));
  };

  return (
    <div>
      <h4 className={css.title}>Регион</h4>
      <button type="button" className={css.input} onClick={handleRegionModal}>
        <FontAwesomeIcon icon={faChevronDown} />
        <span>Киев, Киевская область</span>
      </button>
    </div>
  );
};

export default Region;
