import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../config/theme';
import { ICategories, IState } from '../../../interfaces';
import { openModal } from '../../../redux/modal/actions';
import { formateCatList } from '../../../utils/helpers';
import DropDown from '../DropDown';
import LinkArrow from '../LinkArrow';
import RegionModal from '../RegionModal';

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serach: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme.rem(7),
    width: '100%',
    paddingLeft: theme.rem(2.5),
    background: theme.palette.blue[2],
    fontSize: theme.rem(1.6),
    borderRadius: theme.radius,
    border: theme.border(0.1, theme.palette.gray[3]),
  },
  cat: {
    position: 'relative',
    width: theme.rem(50),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      height: '70%',
      width: theme.rem(0.1),
      background: theme.palette.gray[3],
    },
  },
  input: {
    display: 'block',
    width: '100%',
    height: '100%',
    padding: theme.rem(2),
    background: 'none',
    border: 'none',
  },
  btn: {
    height: theme.rem(7),
    width: theme.rem(40),
    marginLeft: theme.rem(2),
    background: theme.palette.red[0],
    fontSize: theme.rem(1.6),
    color: theme.palette.white,
    borderRadius: theme.radius,
  },
  icon: {
    fontSize: theme.rem(1.4),
  },
  location: {
    marginBottom: theme.rem(2),
    fontSize: theme.rem(1.6),
    color: theme.palette.blue[0],
    '&:hover': {
      textDecoration: 'underline',
    },
    '& span': {
      marginLeft: theme.rem(1),
    },
  },
  toHome: {
    marginBottom: theme.rem(2),
    fontSize: theme.rem(1.6),
    fontWeight: theme.text.weight[3],
    color: theme.palette.blue[0],
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Search = (): ReactElement => {
  const css = useStyles();
  const { pathname } = useRouter();
  const dispatch = useDispatch();

  const categories = useSelector<IState, ICategories[]>(
    state => state.categories,
  );

  const handleRegionModal = () => {
    dispatch(openModal({ dom: <RegionModal /> }));
  };

  return (
    <>
      {pathname === '/' ? (
        <button className={css.location} onClick={handleRegionModal}>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>Вы находитесь в Украина, Киев?</span>
        </button>
      ) : (
        <div className={css.toHome}>
          <LinkArrow href="/" toLeft>
            На главную
          </LinkArrow>
        </div>
      )}

      <div className={css.wrp}>
        <form action="#" method="post" className={css.serach}>
          <span className={css.icon}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            className={css.input}
            type="text"
            placeholder="Что вы ищите?"
          />
          <div className={css.cat}>
            {!!categories?.length && (
              <DropDown
                value={formateCatList(categories)}
                onSubmit={console.log}
                height={6.8}
                transparent
                toRight
              />
            )}
          </div>
        </form>
        <button className={css.btn}>Найти</button>
      </div>
    </>
  );
};

export default Search;
