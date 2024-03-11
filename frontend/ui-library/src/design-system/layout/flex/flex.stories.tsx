import { Meta } from '@storybook/react';
import { range } from 'lodash-es';
import { Heading } from 'src/design-system/foundation';
import { Wrapper } from 'src/storybook/wrapper';

import { Flex } from './flex';

const meta: Meta<typeof Flex> = {
    title: 'Layout/Flex',
    component: Flex,
};

export default meta;

const styles = `<style>
.rect {
    background: var(--secondary-red-500);
    border: 1px solid var(--primary-red-500);
    margin: 0.5rem;
    width: 5rem;
}
.subheading {
    margin: 2rem 0 1rem;
}
.flex {
    border: 1px dashed var(--gray-700);
    padding: 0.5rem;
}
</style>`;

const List = () => {
    return (
        <>
            {range(1, 6).map(item => (
                <div key={item} className="rect" style={{ height: item * 5 + 'rem' }} />
            ))}
        </>
    );
};

export const Base = () => {
    return (
        <Wrapper title="Flex | Base" styles={styles}>
            <Flex>
                <List />
            </Flex>
        </Wrapper>
    );
};

export const Center = () => {
    return (
        <Wrapper title="Flex | Center" styles={styles}>
            <Heading className="subheading">Center (horizontally + vertically)</Heading>
            <Flex justify="center" align="center">
                <List />
            </Flex>

            <Heading className="subheading">Center horizontally</Heading>
            <Flex align="center">
                <List />
            </Flex>

            <Heading className="subheading">Center vertically</Heading>
            <Flex justify="center">
                <List />
            </Flex>
        </Wrapper>
    );
};

export const Other = () => {
    return (
        <Wrapper title="Flex | Other" styles={styles}>
            <Heading className="subheading">Space between</Heading>
            <Flex justify="space-between">
                <List />
            </Flex>

            <Heading className="subheading">Top + Left</Heading>
            <Flex align="flex-start" justify="flex-start">
                <List />
            </Flex>

            <Heading className="subheading">Bottom + Right</Heading>
            <Flex align="flex-end" justify="flex-end">
                <List />
            </Flex>
        </Wrapper>
    );
};

export const Media = () => {
    return (
        <Wrapper title="Flex | Media" styles={styles}>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                justify={{ base: 'flex-start', md: 'center', lg: 'space-between' }}
                align={{ base: 'center', md: 'flex-end', lg: 'center' }}
            >
                <List />
            </Flex>
        </Wrapper>
    );
};
