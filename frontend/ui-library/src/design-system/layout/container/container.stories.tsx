import { Meta } from '@storybook/react';
import { Heading } from 'src/design-system/foundation';
import { Wrapper } from 'src/storybook/wrapper';

import { Container } from './container';

const meta: Meta<typeof Container> = {
    title: 'Layout/Container',
    component: Container,
};

export default meta;

const styles = `<style>
.inner {
    height: 20rem;
    background: var(--secondary-red-400);
    border: 1px solid var(--primary-red-500);
}
.subheading {
    text-align: center;
    margin: 4rem 0 2rem;
}
</style>`;

export const Base = () => (
    <Wrapper title="Container | Base" styles={styles}>
        <Heading className="subheading">Size lg</Heading>
        <Container size="lg">
            <div className="inner" />
        </Container>

        <Heading className="subheading">Size md</Heading>
        <Container size="md">
            <div className="inner" />
        </Container>

        <Heading className="subheading">Size sm</Heading>
        <Container size="sm">
            <div className="inner" />
        </Container>
    </Wrapper>
);
