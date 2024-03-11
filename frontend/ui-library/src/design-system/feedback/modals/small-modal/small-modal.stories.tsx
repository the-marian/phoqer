import { Meta } from '@storybook/react';
import { LongText } from 'src/storybook/long-text';
import { Wrapper } from 'src/storybook/wrapper';

import { SmallModal } from './small-modal';

const meta: Meta<typeof SmallModal> = {
    title: 'Feedback/Modals',
    component: SmallModal,
};

export default meta;

export const Small = () => (
    <Wrapper title="Small modals">
        <SmallModal isOpen onClose={() => null} title="Modals" footer="Aperiam aut consequatur culpa cum dignissimos dolore">
            <LongText count={10} />
        </SmallModal>
    </Wrapper>
);
