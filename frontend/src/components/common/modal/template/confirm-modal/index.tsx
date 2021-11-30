import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import Button from '../../../button';
import { modal } from '../../index';
import StickyModal from '../../sticky-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    img: {
        display: 'block',
        width: theme.rem(7),
        margin: '1rem auto',
        textAlign: 'center',
    },
    title: {
        fontSize: theme.rem(1.4),
        textAlign: 'center',
        fontWeight: theme.text.weight[4],
        color: theme.palette.primary[0],
    },
    text: {
        padding: theme.rem(2),
        fontSize: theme.rem(1.4),
        textAlign: 'center',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: theme.rem(4),
    },
    btn: {
        ...mixin(theme).btn,
        marginLeft: theme.rem(1),

        ...theme.hover({
            background: theme.palette.primary[1],
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
    },
    cancel: {
        ...mixin(theme).btn,
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
    },
}));

interface IProps {
    title: string;
    content: string;
    mainButtonText?: string;
    onSubmit: () => void;
}

const ConfirmModalTemplate = ({ title, content, mainButtonText = 'Подтвердить', onSubmit }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <StickyModal>
            <>
                <img className={css.img} src="/icons/faq.png" alt="" />
                <h2 className={css.title}>{title}</h2>
                <p className={css.text}>{content}</p>
                <div className={css.flex}>
                    <Button className={css.cancel} onClick={modal.close}>
                        Отменить
                    </Button>
                    <Button
                        className={css.btn}
                        onClick={() => {
                            modal.close();
                            onSubmit();
                        }}
                    >
                        {mainButtonText}
                    </Button>
                </div>
            </>
        </StickyModal>
    );
};

export default ConfirmModalTemplate;
