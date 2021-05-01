import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import SmallModalWrp from '../small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        fontSize: theme.rem(1.4),
    },
}));

const RegionModal = (): ReactElement => {
    const css = useStyles();
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
