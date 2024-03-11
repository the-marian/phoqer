import { Meta } from '@storybook/react';
import { Wrapper } from 'src/storybook/wrapper';

import { ConfirmModal } from './confirm-modal';

const meta: Meta<typeof ConfirmModal> = {
    title: 'Feedback/Modals',
    component: ConfirmModal,
};

export default meta;

export const Confirm = () => (
    <Wrapper title="Small modals">
        <ConfirmModal isOpen onClose={() => null} confirmLabel="Confirm" cancelLabel="Cancel" onSubmit={() => alert('Submit')}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit?
        </ConfirmModal>
    </Wrapper>
);
