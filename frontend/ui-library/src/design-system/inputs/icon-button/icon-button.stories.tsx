import { Meta } from '@storybook/react';
import { ShareIcon, EllipsisVerticalIcon, PlusIcon, Grid3x3Icon } from 'src/design-system/icons';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';
import { BaseSizes } from 'src/types/sizes.type';

import { IconButton } from './icon-button';

const meta: Meta<typeof IconButton> = {
    title: 'Inputs/IconButton',
    component: IconButton,
};

export default meta;

const styles = `<style>
.grid-item > * {
    margin-right: 1rem;
}
</style>`;

const sizes: BaseSizes[] = ['sm', 'md', 'lg'];

const icons = [<ShareIcon key={1} />, <EllipsisVerticalIcon key={2} />, <PlusIcon key={3} />, <Grid3x3Icon key={4} />];

export const Base = () => (
    <Wrapper title="Icon Button | Base" styles={styles}>
        <Grid size={{ base: 1, sm: 2, lg: 3 }}>
            {sizes.map((size, index) => (
                <GridItem key={index}>
                    {icons.map((icon, innerIndex) => (
                        <IconButton label="Hello" size={size} key={`${index} - ${innerIndex}`}>
                            {icon}
                        </IconButton>
                    ))}
                </GridItem>
            ))}

            {sizes.map((size, index) => (
                <GridItem key={index}>
                    {icons.map((icon, innerIndex) => (
                        <IconButton label="Hello" size={size} isDisabled key={`${index} - ${innerIndex}`}>
                            {icon}
                        </IconButton>
                    ))}
                </GridItem>
            ))}

            {sizes.map((size, index) => (
                <GridItem key={index}>
                    {icons.map((icon, innerIndex) => (
                        <IconButton label="Hello" size={size} isLoading key={`${index} - ${innerIndex}`}>
                            {icon}
                        </IconButton>
                    ))}
                </GridItem>
            ))}
        </Grid>
    </Wrapper>
);

export const Filled = () => (
    <Wrapper title="Icon Button | Filled" styles={styles}>
        <Grid size={{ base: 1, sm: 2, lg: 3 }}>
            {sizes.map((size, index) => (
                <GridItem key={index}>
                    {icons.map((icon, innerIndex) => (
                        <IconButton label="Hello" size={size} isFilled key={`${index} - ${innerIndex}`}>
                            {icon}
                        </IconButton>
                    ))}
                </GridItem>
            ))}

            {sizes.map((size, index) => (
                <GridItem key={index}>
                    {icons.map((icon, innerIndex) => (
                        <IconButton label="Hello" size={size} isDisabled isFilled key={`${index} - ${innerIndex}`}>
                            {icon}
                        </IconButton>
                    ))}
                </GridItem>
            ))}

            {sizes.map((size, index) => (
                <GridItem key={index}>
                    {icons.map((icon, innerIndex) => (
                        <IconButton label="Hello" size={size} isLoading isFilled key={`${index} - ${innerIndex}`}>
                            {icon}
                        </IconButton>
                    ))}
                </GridItem>
            ))}
        </Grid>
    </Wrapper>
);

export const Rect = () => (
    <Wrapper title="Icon Button | Rect" styles={styles}>
        <Grid size={{ base: 1, sm: 2, lg: 3 }}>
            {sizes.map((size, index) => (
                <GridItem key={index}>
                    {icons.map((icon, innerIndex) => (
                        <IconButton label="Hello" size={size} isFilled isRect key={`${index} - ${innerIndex}`}>
                            {icon}
                        </IconButton>
                    ))}
                </GridItem>
            ))}

            {sizes.map((size, index) => (
                <GridItem key={index}>
                    {icons.map((icon, innerIndex) => (
                        <IconButton label="Hello" size={size} isDisabled isFilled isRect key={`${index} - ${innerIndex}`}>
                            {icon}
                        </IconButton>
                    ))}
                </GridItem>
            ))}

            {sizes.map((size, index) => (
                <GridItem key={index}>
                    {icons.map((icon, innerIndex) => (
                        <IconButton label="Hello" size={size} isLoading isFilled isRect key={`${index} - ${innerIndex}`}>
                            {icon}
                        </IconButton>
                    ))}
                </GridItem>
            ))}
        </Grid>
    </Wrapper>
);
