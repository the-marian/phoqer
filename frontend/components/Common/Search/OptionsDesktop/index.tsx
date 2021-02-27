import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { findCategory, findSubCategory, formatCatList } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ICategories, IDropValue, IState } from '../../../../interfaces';
import DropDown from '../../DropDown';
import { modal } from '../../Modal';
import RegionModal from '../../RegionModal';

const useStyles = createUseStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: theme.rem(50),
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        height: '100%',
        padding: theme.rem(2),
        fontSize: theme.rem(1.4),
        background: 'none',
        border: 'none',
        color: theme.palette.primary[0],

        '& span': {
            width: theme.rem(20),
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    },
    icon: {
        width: theme.rem(2.4),
    },
    categories: {
        display: 'flex',
        alignItems: 'center',
        width: '50%',
    },
    line: {
        display: 'block',
        height: theme.rem(3),
        width: theme.rem(0.1),
        marginRight: theme.rem(0.1),
        background: theme.palette.gray[2],
    },
}));

interface IProps {
    onChange: (value: IDropValue) => void;
}

const OptionsDesktop = ({ onChange }: IProps): ReactElement => {
    const css = useStyles();
    const T = useTrans();
    const history = useRouter();

    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = formatCatList(data);

    // init
    const initCat = typeof history.query.category === 'object' ? history.query.category[0] : history.query.category;
    const initSubCat =
        typeof history.query.sub_category === 'object' ? history.query.sub_category[0] : history.query.sub_category;
    const defaultValue = initCat ? findCategory(data, initCat) : initSubCat ? findSubCategory(data, initSubCat) : null;

    const handleRegionModal = () => {
        modal.open(<RegionModal />);
    };

    return (
        <div className={css.container}>
            <span className={css.line} />
            <div className={css.categories}>
                <DropDown
                    defaultValue={defaultValue}
                    data={categories}
                    placeholder={T.select_category}
                    onChange={onChange}
                    height={6}
                    withSub
                    transparent
                />
            </div>
            <span className={css.line} />
            <button type="button" className={css.location} onClick={handleRegionModal}>
                <img className={css.icon} src="/emoji/map.png" alt="" />
                <span>Киев, Киевская область Киев, Киевская область Киев, Киевская область</span>
            </button>
        </div>
    );
};

export default OptionsDesktop;
