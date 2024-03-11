import { Meta } from '@storybook/react';
import { LongText } from 'src/storybook/long-text';
import { Wrapper } from 'src/storybook/wrapper';

import { MidModal } from './mid-modal';

const meta: Meta<typeof MidModal> = {
    title: 'Feedback/Modals',
    component: MidModal,
};

export default meta;

export const Mid = () => (
    <Wrapper title="Small modals">
        <MidModal isOpen onClose={() => undefined} title="Modals" footer="Aperiam aut consequatur culpa cum dignissimos dolore">
            <LongText count={10} />
        </MidModal>
    </Wrapper>
);
