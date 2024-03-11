import { Meta } from '@storybook/react';
import { Button } from 'src/design-system/inputs';
import { useIsOpen } from 'src/hooks';
import { Wrapper } from 'src/storybook/wrapper';

import { ModalHeader } from '../modals/common';

import { Drawer } from './drawer';

const meta: Meta<typeof Drawer> = {
    title: 'Feedback/Drawer',
    component: Drawer,
};

export default meta;

export const Base = () => {
    const left = useIsOpen();
    const right = useIsOpen();

    return (
        <Wrapper title="Confetti">
            <Button onClick={left.onOpen}>Open left drawer</Button>

            <Button onClick={right.onOpen} style={{ marginLeft: '20px' }}>
                Open right drawer
            </Button>

            <Drawer open={left.isOpen} onClose={left.onClose}>
                <ModalHeader onClose={left.onClose}>Consectetur cum ducimus et voluptatibus.</ModalHeader>

                <div style={{ padding: '2rem' }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At eum facilis laboriosam magni non quo tempore
                    ullam? Accusamus amet, ducimus ex excepturi fuga magnam natus. Consectetur cum ducimus et voluptatibus.
                </div>
            </Drawer>

            <Drawer open={right.isOpen} onClose={right.onClose} direction="right">
                <ModalHeader onClose={right.onClose}>Consectetur cum ducimus et voluptatibus.</ModalHeader>

                <div style={{ padding: '2rem' }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At eum facilis laboriosam magni non quo tempore
                    ullam? Accusamus amet, ducimus ex excepturi fuga magnam natus. Consectetur cum ducimus et voluptatibus.
                </div>
            </Drawer>
        </Wrapper>
    );
};
