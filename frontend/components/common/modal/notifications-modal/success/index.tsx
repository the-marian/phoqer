import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../assets/template';
import { Theme } from '../../../../../assets/theme';
import useTrans from '../../../../../hooks/trans.hook';
import { modal } from '../../index';
import SmallModalWrp from '../../small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[4],
        color: theme.palette.green[0],
        textAlign: 'center',
    },
    img: {
        display: 'block',
        width: theme.rem(7),
        margin: '0 auto 2rem',
        textAlign: 'center',
    },
    text: {
        marginTop: theme.rem(1),
        fontSize: theme.rem(1.4),
        textAlign: 'center',
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.rem(3, 0, 0),
    },
    button: {
        ...template(theme).btn,
        minWidth: theme.rem(20),
        background: theme.palette.green[0],
    },
}));
interface IProps {
    text?: string;
}

const NotificationSuccess = ({ text }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    return (
        <SmallModalWrp>
            <>
                <img className={css.img} src="/emoji/success.png" alt="" />
                <h4 className={css.title}>{trans('success')}</h4>
                <p className={css.text}>{trans(text || 'success')}</p>

                <div className={css.flex}>
                    <button className={css.button} type="button" onClick={modal.close}>
                        Ok
                    </button>
                </div>
            </>
        </SmallModalWrp>
    );
};

export default NotificationSuccess;
