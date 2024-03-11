import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Heading } from '../heading';

import { Text } from './text';

const meta: Meta<typeof Text> = {
    title: 'Foundation/Text',
    component: Text,
};

export default meta;

const styles = `<style>
.grid-item {
    padding: 2rem;
    min-height: 40rem;
}
.subheader {
    margin-bottom: 1rem;
}
</style>`;

const content =
    'Atque autem maiores perspiciatis quis repellendus! Ad, facere mollitia non quod repudiandae sed temporibus. Atque beatae cum deserunt earum odio perspiciatis, saepe.';

export const Size = () => (
    <Wrapper title="Text | Size" styles={styles}>
        <Grid size={{ base: 1, sm: 2, lg: 3 }}>
            <GridItem>
                <Heading className="subheader">Size - XL</Heading>
                <Text size="xl">{content}</Text>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Size - LG</Heading>
                <Text size="lg">{content}</Text>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Size - MD</Heading>
                <Text size="md">{content}</Text>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Size - SM</Heading>
                <Text size="sm">{content}</Text>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Size - SX</Heading>
                <Text size="xs">{content}</Text>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Weight = () => (
    <Wrapper title="Text | Weight" styles={styles}>
        <Grid size={{ base: 1, sm: 2, lg: 3 }}>
            <GridItem>
                <Heading className="subheader">Weight - 300</Heading>
                <Text size="lg" weight={300}>
                    {content}
                </Text>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Weight - 400</Heading>
                <Text size="lg" weight={400}>
                    {content}
                </Text>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Weight - 500</Heading>
                <Text size="lg" weight={500}>
                    {content}
                </Text>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Style = () => (
    <Wrapper title="Text | Font Style" styles={styles}>
        <Grid size={{ base: 1, sm: 2, lg: 3 }}>
            <GridItem>
                <Heading className="subheader">Font Style - normal</Heading>
                <Text size="lg" fontStyle="normal">
                    {content}
                </Text>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Font Style - italic</Heading>
                <Text size="lg" fontStyle="italic">
                    {content}
                </Text>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Media = () => (
    <Wrapper title="Text | Media" styles={styles}>
        <Text size={{ base: 'sm', md: 'md', lg: 'lg' }} weight={{ base: 300, sm: 400, md: 500 }}>
            {content}
        </Text>
    </Wrapper>
);
