import React, { ReactElement, useCallback, useEffect } from 'react';

import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import types from '../../../../../redux/types';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import Button from '../../../../common/button';
import { modal } from '../../../../common/modal';
import StickyModal from '../../../../common/modal/sticky-modal';

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
    payload: { id: number; page: number };
}

const NotificationsDeleteModal = ({ payload }: IProps): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const handleDelete = useCallback((): void => {
        dispatch({ type: types.DELETE_NOTIFICATION_START, payload });
        modal.close();
    }, [dispatch, payload]);

    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.key === 'Enter') handleDelete();
        };
        window.addEventListener('keypress', handler);
        return () => {
            window.removeEventListener('keypress', handler);
        };
    }, [handleDelete]);

    return (
        <StickyModal>
            <>
                <img className={css.img} src="/icons/faq.png" alt="" />
                <h2 className={css.title}>Вы уверенны что хотите удалить это уведомление?</h2>
                <p className={css.text}>После этого действия вы больше не сможете востановить его</p>
                <div className={css.flex}>
                    <Button className={css.cancel} onClick={modal.close}>
                        Отменить
                    </Button>
                    <Button className={css.btn} onClick={handleDelete}>
                        Удалить
                    </Button>
                </div>
            </>
        </StickyModal>
    );
};

export default NotificationsDeleteModal;
