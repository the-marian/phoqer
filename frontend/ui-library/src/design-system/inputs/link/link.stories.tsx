import { Meta } from '@storybook/react';
import { ShareIcon, PlusIcon } from 'src/design-system/icons';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Link } from './link';

const meta: Meta<typeof Link> = {
    title: 'Inputs/Link',
    component: Link,
};

export default meta;

export const Small = () => (
    <Wrapper title="Link | Small">
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Link size="sm">Primary</Link>
            </GridItem>
            <GridItem>
                <Link size="sm" isLoading>
                    Primary
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" isDisabled>
                    Primary
                </Link>
            </GridItem>

            <GridItem>
                <Link size="sm" variant="secondary">
                    Secondary
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" variant="secondary" isLoading>
                    Secondary
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" variant="secondary" isDisabled>
                    Secondary
                </Link>
            </GridItem>

            <GridItem>
                <Link size="sm" variant="link">
                    Link
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" variant="link" isLoading>
                    Link
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" variant="link" isDisabled>
                    Link
                </Link>
            </GridItem>

            <GridItem>
                <Link size="sm" variant="text">
                    Text
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" variant="text" isLoading>
                    Text
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" variant="text" isDisabled>
                    Text
                </Link>
            </GridItem>

            <GridItem>
                <Link size="sm" variant="ghost">
                    Ghost
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" variant="ghost" isLoading>
                    Ghost
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" variant="ghost" isDisabled>
                    Ghost
                </Link>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Middle = () => (
    <Wrapper title="Link | Middle">
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Link>Primary</Link>
            </GridItem>
            <GridItem>
                <Link isLoading>Primary</Link>
            </GridItem>
            <GridItem>
                <Link isDisabled>Primary</Link>
            </GridItem>

            <GridItem>
                <Link variant="secondary">Secondary</Link>
            </GridItem>
            <GridItem>
                <Link variant="secondary" isLoading>
                    Secondary
                </Link>
            </GridItem>
            <GridItem>
                <Link variant="secondary" isDisabled>
                    Secondary
                </Link>
            </GridItem>

            <GridItem>
                <Link variant="link">Link</Link>
            </GridItem>
            <GridItem>
                <Link variant="link" isLoading>
                    Link
                </Link>
            </GridItem>
            <GridItem>
                <Link variant="link" isDisabled>
                    Link
                </Link>
            </GridItem>

            <GridItem>
                <Link variant="text">Text</Link>
            </GridItem>
            <GridItem>
                <Link variant="text" isLoading>
                    Text
                </Link>
            </GridItem>
            <GridItem>
                <Link variant="text" isDisabled>
                    Text
                </Link>
            </GridItem>

            <GridItem>
                <Link variant="ghost">Ghost</Link>
            </GridItem>
            <GridItem>
                <Link variant="ghost" isLoading>
                    Ghost
                </Link>
            </GridItem>
            <GridItem>
                <Link variant="ghost" isDisabled>
                    Ghost
                </Link>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Large = () => (
    <Wrapper title="Link | Large">
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Link size="lg">Primary</Link>
            </GridItem>
            <GridItem>
                <Link size="lg" isLoading>
                    Primary
                </Link>
            </GridItem>
            <GridItem>
                <Link size="lg" isDisabled>
                    Primary
                </Link>
            </GridItem>

            <GridItem>
                <Link size="lg" variant="secondary">
                    Secondary
                </Link>
            </GridItem>
            <GridItem>
                <Link size="lg" variant="secondary" isLoading>
                    Secondary
                </Link>
            </GridItem>
            <GridItem>
                <Link size="lg" variant="secondary" isDisabled>
                    Secondary
                </Link>
            </GridItem>

            <GridItem>
                <Link size="lg" variant="link">
                    Link
                </Link>
            </GridItem>
            <GridItem>
                <Link size="lg" variant="link" isLoading>
                    Link
                </Link>
            </GridItem>
            <GridItem>
                <Link size="lg" variant="link" isDisabled>
                    Link
                </Link>
            </GridItem>

            <GridItem>
                <Link size="lg" variant="text">
                    Text
                </Link>
            </GridItem>
            <GridItem>
                <Link size="lg" variant="text" isLoading>
                    Text
                </Link>
            </GridItem>
            <GridItem>
                <Link size="lg" variant="text" isDisabled>
                    Text
                </Link>
            </GridItem>

            <GridItem>
                <Link size="lg" variant="ghost">
                    Ghost
                </Link>
            </GridItem>
            <GridItem>
                <Link size="lg" variant="ghost" isLoading>
                    Ghost
                </Link>
            </GridItem>
            <GridItem>
                <Link size="lg" variant="ghost" isDisabled>
                    Ghost
                </Link>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Icons = () => (
    <Wrapper title="Link | Icons">
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Link size="sm" leftIcon={<PlusIcon />}>
                    Primary
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" rightIcon={<ShareIcon />}>
                    Primary
                </Link>
            </GridItem>
            <GridItem>
                <Link size="sm" leftIcon={<PlusIcon />} rightIcon={<ShareIcon />}>
                    Primary
                </Link>
            </GridItem>

            <GridItem>
                <Link leftIcon={<PlusIcon />}>Primary</Link>
            </GridItem>
            <GridItem>
                <Link rightIcon={<ShareIcon />}>Primary</Link>
            </GridItem>
            <GridItem>
                <Link leftIcon={<PlusIcon />} rightIcon={<ShareIcon />}>
                    Primary
                </Link>
            </GridItem>

            <GridItem>
                <Link leftIcon={<PlusIcon />} size="lg">
                    Primary
                </Link>
            </GridItem>
            <GridItem>
                <Link rightIcon={<ShareIcon />} size="lg">
                    Primary
                </Link>
            </GridItem>
            <GridItem>
                <Link leftIcon={<PlusIcon />} rightIcon={<ShareIcon />} size="lg">
                    Primary
                </Link>
            </GridItem>

            <GridItem>
                <Link leftIcon={<PlusIcon />} variant="secondary">
                    Secondary
                </Link>
            </GridItem>
            <GridItem>
                <Link rightIcon={<ShareIcon />} variant="secondary">
                    Secondary
                </Link>
            </GridItem>
            <GridItem>
                <Link leftIcon={<PlusIcon />} rightIcon={<ShareIcon />} variant="secondary">
                    Secondary
                </Link>
            </GridItem>

            <GridItem>
                <Link leftIcon={<PlusIcon />} variant="text">
                    Text
                </Link>
            </GridItem>
            <GridItem>
                <Link rightIcon={<ShareIcon />} variant="text">
                    Text
                </Link>
            </GridItem>
            <GridItem>
                <Link leftIcon={<PlusIcon />} rightIcon={<ShareIcon />} variant="text">
                    Text
                </Link>
            </GridItem>

            <GridItem>
                <Link leftIcon={<PlusIcon />} variant="ghost">
                    Ghost
                </Link>
            </GridItem>
            <GridItem>
                <Link rightIcon={<ShareIcon />} variant="ghost">
                    Ghost
                </Link>
            </GridItem>
            <GridItem>
                <Link leftIcon={<PlusIcon />} rightIcon={<ShareIcon />} variant="ghost">
                    Ghost
                </Link>
            </GridItem>
        </Grid>
    </Wrapper>
);
