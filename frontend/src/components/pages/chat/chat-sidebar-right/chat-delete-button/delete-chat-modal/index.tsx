import React, { ReactElement } from 'react';

import ConfirmModalTemplate from '../../../../../common/modal/template/confirm-modal';

interface IProps {
    onDelete: () => void;
}

const DeleteChatModal = ({ onDelete }: IProps): ReactElement => {
    return (
        <ConfirmModalTemplate
            title="Вы уверенны, что хотите удалить этот чат?"
            content="После этого действия вы больше не сможете востановить его"
            onSubmit={onDelete}
        />
    );
};

export default DeleteChatModal;
