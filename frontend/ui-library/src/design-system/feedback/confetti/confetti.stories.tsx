import { useState } from 'react';

import { Meta } from '@storybook/react';
import { Button } from 'src/design-system/inputs';
import { Wrapper } from 'src/storybook/wrapper';

import { Confetti } from './confetti';

const meta: Meta<typeof Confetti> = {
    title: 'Feedback/Confetti',
    component: Confetti,
};

export default meta;

export const Base = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (!open) {
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }
    };

    return (
        <Wrapper title="Confetti">
            {open && <Confetti />}
            <Button onClick={handleOpen}>Run confetti</Button>
        </Wrapper>
    );
};
