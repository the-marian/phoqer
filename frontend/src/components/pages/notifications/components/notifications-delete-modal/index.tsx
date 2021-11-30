import React, { ReactElement, useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import types from '../../../../../redux/types';
import { modal } from '../../../../common/modal';
import ConfirmModalTemplate from '../../../../common/modal/template/confirm-modal';

interface IProps {
    payload: { id: number; page: number };
}

const NotificationsDeleteModal = ({ payload }: IProps): ReactElement => {
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
        <ConfirmModalTemplate
            title="Вы уверенны, что хотите удалить это уведомление?"
            content="После этого действия вы больше не сможете востановить его"
            onSubmit={handleDelete}
        />
    );
};

export default NotificationsDeleteModal;
