import { Meta } from '@storybook/react';
import { nanoid } from 'nanoid';
import { Button } from 'src/design-system/inputs';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { toast, ToastProvider } from './toast';

const meta: Meta<typeof ToastProvider> = {
    title: 'Feedback/Toasts',
    component: ToastProvider,
};

export default meta;

const styles = `<style>
.container button {
    margin-right: 2rem;
    margin-bottom: 4rem;
}
</style>`;

export const Base = () => {
    const info = () => {
        const id = nanoid();

        toast.info({
            id,
            title: 'Info toast',
            content: (
                <>
                    Toast id: ${id}.
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum earum ex facere facilis fuga fugiat hic, id
                    illum incidunt laboriosam magnam neque omnis sapiente totam voluptas? Cumque facere nam veritatis.
                </>
            ),
        });
    };

    const error = () => {
        const id = nanoid();

        toast.error({
            id,
            title: 'Error toast',
            button: {
                close: {
                    label: 'Close',
                },
            },
            content: (
                <>
                    Toast id: ${id}.
                    <br />
                    Lorem ipsum dolor sit amet, consectetur elit.
                </>
            ),
        });
    };

    const success = () => {
        const id = nanoid();

        toast.success({
            id,
            title: 'Success toast',
            button: {
                close: {
                    label: 'Close',
                },
            },
            content: (
                <>
                    Toast id: ${id}.
                    <br />
                    Lorem ipsum dolor sit amet, consectetur elit.
                </>
            ),
        });
    };

    const withActions = () => {
        const id = nanoid();

        toast.info({
            id,
            title: 'Info toast',
            button: {
                close: {
                    label: 'Close',
                },
                extra: {
                    label: 'Retry',
                    onClick: success,
                },
            },
            content: <>Toast id: ${id}.</>,
        });
    };

    return (
        <Wrapper title="Avatar" styles={styles}>
            <ToastProvider>
                <Grid size={{ base: 1, sm: 2, md: 3, lg: 5 }}>
                    <GridItem>
                        <Button onClick={info}>Add Info toast</Button>
                    </GridItem>
                    <GridItem>
                        <Button onClick={error}>Add Error toast</Button>
                    </GridItem>
                    <GridItem>
                        <Button onClick={success}>Add Success toast</Button>
                    </GridItem>
                    <GridItem>
                        <Button onClick={withActions}>Add Success toast</Button>
                    </GridItem>
                </Grid>
            </ToastProvider>
        </Wrapper>
    );
};
