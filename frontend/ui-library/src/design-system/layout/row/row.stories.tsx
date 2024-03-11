import { Meta } from '@storybook/react';
import { Heading } from 'src/design-system/foundation';
import { Wrapper } from 'src/storybook/wrapper';

import { Flex } from '../flex';

import { Cell } from './cell';
import { Row } from './row';

const meta: Meta<typeof Row> = {
    title: 'Layout/Row',
    component: Row,
};

export default meta;

const styles = `<style>
.box {
    border: 1px dashed var(--gray-700);
    height: 8rem;
}
</style>`;

export const Base = () => {
    return (
        <Wrapper title="Row | Base" styles={styles}>
            <Row spacing={1}>
                <Cell size={2}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>2</Heading>
                    </Flex>
                </Cell>
                <Cell size={2}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>2</Heading>
                    </Flex>
                </Cell>
                <Cell size={2}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>2</Heading>
                    </Flex>
                </Cell>
                <Cell size={2}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>2</Heading>
                    </Flex>
                </Cell>
                <Cell size={2}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>2</Heading>
                    </Flex>
                </Cell>
                <Cell size={2}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>2</Heading>
                    </Flex>
                </Cell>

                <Cell size={3}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>3</Heading>
                    </Flex>
                </Cell>
                <Cell size={3}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>3</Heading>
                    </Flex>
                </Cell>
                <Cell size={6}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>6</Heading>
                    </Flex>
                </Cell>

                <Cell size={6}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>6</Heading>
                    </Flex>
                </Cell>
                <Cell size={6}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>6</Heading>
                    </Flex>
                </Cell>

                <Cell size={12}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>12</Heading>
                    </Flex>
                </Cell>
            </Row>
        </Wrapper>
    );
};

export const Media = () => {
    return (
        <Wrapper title="Row | Media" styles={styles}>
            <Row spacing={{ base: 0.5, md: 2 }}>
                <Cell size={{ base: 6, md: 4, lg: 2 }}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>Media</Heading>
                    </Flex>
                </Cell>
                <Cell size={{ base: 6, md: 4, lg: 2 }}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>Media</Heading>
                    </Flex>
                </Cell>
                <Cell size={{ base: 6, md: 4, lg: 2 }}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>Media</Heading>
                    </Flex>
                </Cell>
                <Cell size={{ base: 6, md: 4, lg: 2 }}>
                    <Flex justify="center" align="center" className="box">
                        <Heading>Media</Heading>
                    </Flex>
                </Cell>
            </Row>
        </Wrapper>
    );
};
