import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        padding: theme.rem(1),
    },
}));

import SmallModalWrp from '../../../common/modal/small-modal-wrp';

const RentModal = (): ReactElement => {
    const css = useStyles();
    return (
        <SmallModalWrp>
            <div className={css.root}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum modi, obcaecati? Assumenda dolorum enim est
                expedita, hic in, iste molestias mollitia pariatur praesentium, quisquam quod recusandae reprehenderit similique
                vero voluptates!
            </div>
        </SmallModalWrp>
    );
};

export default RentModal;
