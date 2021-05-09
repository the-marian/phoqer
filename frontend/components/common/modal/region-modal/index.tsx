import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { Theme } from '../../../../assets/theme';
import types from '../../../../redux/types';
import SmallModalWrp from '../small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        fontSize: theme.rem(1.4),
    },
}));

const RegionModal = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: types.GET_COUNTRIES_START });
    }, [dispatch]);

    return (
        <SmallModalWrp>
            <div className={css.root}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, beatae omnis. Laborum dolorum dolorem numquam
                est repudiandae. Voluptate ullam rem porro magnam. Odit, exercitationem nisi consectetur dignissimos esse
                similique totam?
            </div>
        </SmallModalWrp>
    );
};

export default RegionModal;
