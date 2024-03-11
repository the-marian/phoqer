import { Meta } from '@storybook/react';
import { Button } from 'src/design-system/inputs';
import { Grid, GridItem } from 'src/design-system/layout';
import { useIsOpen } from 'src/hooks';
import { LongText } from 'src/storybook/long-text';
import { Wrapper } from 'src/storybook/wrapper';

import { LargeModal } from './large-modal';
import { LargeModalHeader } from './large-modal-header';

const meta: Meta<typeof LargeModal> = {
    title: 'Feedback/Modals',
    component: LargeModal,
};

export default meta;

const count = 20;

export const Large = () => {
    const withBoth = useIsOpen();
    const withHeader = useIsOpen();
    const withFooter = useIsOpen();

    return (
        <Wrapper title="Small modals">
            <Grid size={{ base: 1, md: 2, lg: 3 }}>
                <GridItem>
                    <Button style={{ margin: '40px' }} onClick={withHeader.onToggle}>
                        Toggle modal with header
                    </Button>
                </GridItem>
                <GridItem>
                    <Button style={{ margin: '40px' }} onClick={withFooter.onToggle}>
                        Toggle modal with footer
                    </Button>
                </GridItem>
                <GridItem>
                    <Button style={{ margin: '40px' }} onClick={withBoth.onToggle}>
                        Toggle modal with header and footer
                    </Button>
                </GridItem>
            </Grid>

            <LargeModal
                isOpen={withHeader.isOpen}
                onClose={withHeader.onToggle}
                header={<LargeModalHeader title="Go back" onClose={withHeader.onToggle} />}
            >
                <LongText count={count} />
            </LargeModal>

            <LargeModal
                isOpen={withFooter.isOpen}
                onClose={withFooter.onToggle}
                footer={
                    <Button size="sm" variant="primary" onClick={withFooter.onClose}>
                        Close modal
                    </Button>
                }
            >
                <LongText count={count} />
            </LargeModal>

            <LargeModal
                isOpen={withBoth.isOpen}
                onClose={withBoth.onToggle}
                header={<LargeModalHeader title="Go back" onClose={withBoth.onToggle} />}
                footer={
                    <Button size="sm" variant="primary" onClick={withBoth.onClose}>
                        Close modal
                    </Button>
                }
            >
                <LongText count={count} />
            </LargeModal>
        </Wrapper>
    );
};
