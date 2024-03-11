import { Meta } from '@storybook/react';
import { Heading } from 'src/design-system';
import { Button } from 'src/design-system/inputs';
import { Wrapper } from 'src/storybook/wrapper';

import { EmptyState } from './empty-state';

const meta: Meta<typeof EmptyState> = {
    title: 'Templates/EmptyStates',
    component: EmptyState,
};

export default meta;

const styles = `<style>
.inner {
    height: 20rem;
    background: var(--primary-blue-500);
}
</style>`;

const Text = () => (
    <>
        <h3>Nothing to show</h3>
        <p>Ab aliquam dolorum molestiae nobis quo rem sint temporibus?</p>

        <div className="footer">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Apply</Button>
        </div>
    </>
);

export const Base = () => (
    <Wrapper title="Container" styles={styles}>
        <Heading>404</Heading>
        <EmptyState type="404">
            <Text />
        </EmptyState>

        <Heading>Form</Heading>
        <EmptyState type="form">
            <Text />
        </EmptyState>

        <Heading>Search</Heading>
        <EmptyState type="search">
            <Text />
        </EmptyState>

        <Heading>Comments</Heading>
        <EmptyState type="comments">
            <Text />
        </EmptyState>
    </Wrapper>
);
