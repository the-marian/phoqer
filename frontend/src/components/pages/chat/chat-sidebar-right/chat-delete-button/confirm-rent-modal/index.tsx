import React from 'react';

import ConfirmModalTemplate from '../../../../../common/modal/template/confirm-modal';

interface IProps {
    onSubmit: () => void;
}

const ConfirmRentModal = ({ onSubmit }: IProps): JSX.Element => {
    return (
        <ConfirmModalTemplate
            title="Вы уверенны, что хотите одобрить аренду?"
            content="Начало аренды считается с момента, когда вы одобрили аренду"
            onSubmit={onSubmit}
        />
    );
};

export default ConfirmRentModal;
