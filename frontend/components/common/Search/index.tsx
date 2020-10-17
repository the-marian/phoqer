import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../config/theme';
import { ICategories, IState } from '../../../interfaces';
import { openModal } from '../../../redux/modal/actions';
import * as helpers from '../../../utils/helpers';
import DropDown from '../DropDown';
import DropDownMobile from '../DropDownMobile';
import LinkArrow from '../LinkArrow';
import { Desktop, Mobile } from '../Media';
import RegionModal from '../RegionModal';

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '@media (max-width: 960px)': {
      display: 'block',
    },
  },
  form: {
    width: '100%',
  },
  serach: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme.rem(6),
    width: '100%',
    paddingLeft: theme.rem(2.5),
    background: theme.palette.gray[1],
    fontSize: theme.rem(1.6),
    borderRadius: theme.radius,
    border: 'none',
  },
  cat: {
    position: 'relative',
    width: theme.rem(35),
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

    '@media (max-width: 900px)': {
      height: '100%',
      width: theme.rem(8),
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
    height: theme.rem(6),
    width: theme.rem(40),
    marginLeft: theme.rem(2),
    background: theme.palette.blue[0],
    fontSize: theme.rem(1.6),
    color: theme.palette.white,
    borderRadius: theme.radius,

    '@media (max-width: 960px)': {
      width: '100%',
      margin: theme.rem(2, 0),
    },
  },
  icon: {
    fontSize: theme.rem(1.4),
  },
  location: {
    marginBottom: theme.rem(2),
    fontSize: theme.rem(1.6),
    color: theme.palette.blue[1],
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
    color: theme.palette.blue[1],
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  mobileCat: {
    marginTop: theme.rem(1),
  },
}));

const Search = (): ReactElement => {
  const css = useStyles();
  const dispatch = useDispatch();

  const { pathname, query } = useRouter();
  const { category, sub_category } = query;

  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [subCategoryName, setSubCategoryName] = useState<string | null>(null);

  const data = useSelector<IState, ICategories[]>(state => state.categories);
  const categories = helpers.formateCatList(data);

  useEffect(() => {
    if (category) {
      setCategoryName(
        helpers.findCategory(
          data,
          typeof category === 'string' ? category : category[0],
        ),
      );
    }
  }, [category]);

  useEffect(() => {
    if (sub_category) {
      setSubCategoryName(
        helpers.findSubCategory(
          data,
          typeof sub_category === 'string' ? sub_category : sub_category[0],
        ),
      );
    }
  }, [sub_category]);

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
        <form className={css.form} action="#" method="post">
          <div className={css.serach}>
            <span className={css.icon}>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              className={css.input}
              type="text"
              placeholder="Что вы ищите?"
            />
            <Desktop>
              {!!categories?.length && (
                <div className={css.cat}>
                  <DropDown
                    value={categories}
                    onSubmit={console.log}
                    height={6.8}
                    defaultValue={categoryName || subCategoryName}
                    transparent
                    toRight
                  />
                </div>
              )}
            </Desktop>
          </div>

          {pathname === '/' && (
            <Mobile>
              {!!categories?.length && (
                <div className={css.mobileCat}>
                  <DropDownMobile
                    value={categories}
                    onSubmit={console.log}
                    height={6.8}
                    defaultValue={categoryName || subCategoryName}
                    toRight
                  />
                </div>
              )}
            </Mobile>
          )}
        </form>

        <button type="submit" className={css.btn}>
          Найти
        </button>
      </div>
    </>
  );
};

export default Search;
