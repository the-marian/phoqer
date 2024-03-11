import { FC } from 'react';

import { Meta } from '@storybook/react';
import { AlertIcon, Grid3x3Icon, LightIcon, OpenIcon, PlusIcon, ShareIcon, SpinnerIcon } from 'src/design-system/icons';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';
import { BaseSizes } from 'src/types/sizes.type';

import { Option } from './option';

const meta: Meta<typeof Option> = {
    title: 'Inputs/Option',
    component: Option,
};

export default meta;

const styles = `<style>
.divider {
    width: 100%;
    margin: 5px 0;
    border-top: 1px solid var(--gray-200);
}
</style>`;

const Options: FC<Record<'size', BaseSizes>> = ({ size }) => (
    <>
        <Option size={size} leftIcon={<Grid3x3Icon />}>
            Consectetur adipcing
        </Option>
        <Option size={size} leftIcon={<ShareIcon />}>
            Accusantium aliquam
        </Option>
        <div className="divider" />

        <Option size={size} leftIcon={<LightIcon />}>
            Corporis distinctio
        </Option>
        <Option size={size} leftIcon={<OpenIcon />} rightIcon={<PlusIcon />}>
            Reprehenderit sunt
        </Option>
        <div className="divider" />

        <Option size={size} leftIcon={<AlertIcon />} rightIcon={<SpinnerIcon />} isActive>
            Reprehenderit sunt
        </Option>
    </>
);

export const Base = () => {
    return (
        <Wrapper title="Dropdown" styles={styles}>
            <Grid size={{ base: 1, md: 2, lg: 3 }}>
                <GridItem>
                    <Options size="sm" />
                </GridItem>

                <GridItem>
                    <Options size="md" />
                </GridItem>

                <GridItem>
                    <Options size="lg" />
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
