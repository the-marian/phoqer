import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Heading } from './heading';

const meta: Meta<typeof Heading> = {
    title: 'Foundation/Heading',
    component: Heading,
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
                <Heading size="xl">{content}</Heading>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Size - LG</Heading>
                <Heading size="lg">{content}</Heading>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Size - MD</Heading>
                <Heading size="md">{content}</Heading>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Size - SM</Heading>
                <Heading size="sm">{content}</Heading>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Size - XS</Heading>
                <Heading size="xs">{content}</Heading>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Weight = () => (
    <Wrapper title="Text | Weight" styles={styles}>
        <Grid size={{ base: 1, sm: 2, lg: 3 }}>
            <GridItem>
                <Heading className="subheader">Weight - 500</Heading>
                <Heading size="lg" weight={500}>
                    {content}
                </Heading>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Weight - 600</Heading>
                <Heading size="lg" weight={600}>
                    {content}
                </Heading>
            </GridItem>
            <GridItem>
                <Heading className="subheader">Weight - 700</Heading>
                <Heading size="lg" weight={700}>
                    {content}
                </Heading>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Media = () => (
    <Wrapper title="Text | Media" styles={styles}>
        <Heading size={{ base: 'sm', md: 'md', lg: 'lg' }} weight={{ base: 500, md: 700 }}>
            {content}
        </Heading>
    </Wrapper>
);
